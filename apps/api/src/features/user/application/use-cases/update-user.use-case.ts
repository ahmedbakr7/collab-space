import { User } from '@repo/domain';
import { UserRepository } from '../ports/user.repository.interface';
import { UserNotFoundError } from '../errors/user.errors';
import { createHash } from 'crypto';

export interface UpdateUserCommand {
  id: string;
  email?: string;
  name?: string;
  password?: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = await this.userRepository.findById(command.id);

    if (!user) {
      throw new UserNotFoundError(command.id);
    }

    // Password update logic removed as we don't store passwordHash anymore

    const updatedUser = new User(
      user.id,
      command.email ?? user.email,
      command.name ?? user.name,
      user.createdAt,
      new Date(),
      user.avatarUrl,
    );

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }
}
