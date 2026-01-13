import { ResultAsync, err } from 'neverthrow';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../ports/user.repository.interface';
import { UserAlreadyExistsError } from '../errors/user.errors';
import { AppError } from '../../../../shared/app.error';
import * as crypto from 'crypto';

export interface CreateUserCommand {
  email: string;
  name: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(command: CreateUserCommand): ResultAsync<User, AppError> {
    return this.userRepository
      .findByEmail(command.email)
      .andThen((existingUser) => {
        if (existingUser) {
          return err(new UserAlreadyExistsError(command.email));
        }

        const user = new User(
          crypto.randomUUID(),
          command.email,
          command.name,
          new Date(),
        );

        return this.userRepository.save(user).map(() => user);
      });
  }
}
