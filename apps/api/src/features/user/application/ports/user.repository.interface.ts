import { ResultAsync } from 'neverthrow';
import { User } from '../../domain/entities/user.entity';
import { AppError } from '../../../../shared/app.error';

export interface UserRepository {
  save(user: User): ResultAsync<void, AppError>;
  findById(id: string): ResultAsync<User | null, AppError>;
  findByEmail(email: string): ResultAsync<User | null, AppError>;
  findAll(): ResultAsync<User[], AppError>;
}
