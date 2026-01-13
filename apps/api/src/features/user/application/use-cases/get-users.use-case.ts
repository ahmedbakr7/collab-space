import { ResultAsync, ok } from 'neverthrow';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../ports/user.repository.interface';
import { AppError } from '../../../../shared/app.error';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(): ResultAsync<User[], AppError> {
    return this.userRepository.findAll();
  }
}
