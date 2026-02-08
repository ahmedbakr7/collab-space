import { User } from '@repo/domain';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filter?: { userId?: string }): Promise<User[]>;
  delete(id: string): Promise<void>;
}
