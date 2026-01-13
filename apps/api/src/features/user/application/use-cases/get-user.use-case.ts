import { ResultAsync, err, ok } from 'neverthrow';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../ports/user.repository.interface';
import { UserNotFoundError } from '../errors/user.errors';
import { AppError } from '../../../../shared/app.error';

export interface GetUserCommand {
  id: string;
}

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(command: GetUserCommand): ResultAsync<User, AppError> {
    return this.userRepository.findById(command.id).andThen((user) => {
      if (!user) {
        return err(new UserNotFoundError(command.id));
      }
      return ok(user);
    });
  }
}
