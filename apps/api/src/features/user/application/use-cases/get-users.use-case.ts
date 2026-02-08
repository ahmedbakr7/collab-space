import { User } from '@repo/domain';
import { UserRepository } from '../ports/user.repository.interface';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId?: string): Promise<User[]> {
    return this.userRepository.findAll({ userId });
  }
}
