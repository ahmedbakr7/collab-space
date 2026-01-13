import { Injectable } from '@nestjs/common';
import { ResultAsync, okAsync } from 'neverthrow';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../application/ports/user.repository.interface';
import { AppError } from '../../../../shared/app.error';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  // Simulating a DB
  private readonly users: Map<string, any> = new Map();

  save(user: User): ResultAsync<void, AppError> {
    this.users.set(user.id, {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    });
    return okAsync(undefined);
  }

  findById(id: string): ResultAsync<User | null, AppError> {
    const data = this.users.get(id);
    if (!data) return okAsync(null);
    return okAsync(new User(data.id, data.email, data.name, data.createdAt));
  }

  findByEmail(email: string): ResultAsync<User | null, AppError> {
    const data = Array.from(this.users.values()).find((u) => u.email === email);
    if (!data) return okAsync(null);
    return okAsync(new User(data.id, data.email, data.name, data.createdAt));
  }
}
