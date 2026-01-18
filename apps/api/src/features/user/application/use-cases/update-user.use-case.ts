import { User } from '../../domain/entities/user.entity';
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

    let passwordHash = user.passwordHash;
    if (command.password) {
      passwordHash = createHash('sha256')
        .update(command.password)
        .digest('hex');
    }

    const updatedUser = new User(
      user.id,
      command.email ?? user.email,
      command.name ?? user.name,
      passwordHash,
      user.createdAt,
      new Date(),
    );

    await this.userRepository.save(updatedUser);

    return updatedUser;
  }
}
