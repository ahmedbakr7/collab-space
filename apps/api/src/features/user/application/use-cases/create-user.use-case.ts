import { User } from '@repo/domain';
import { UserRepository } from '../ports/user.repository.interface';
import { UserAlreadyExistsError } from '../errors/user.errors';
import { createHash, randomUUID } from 'crypto';

export interface CreateUserCommand {
  email: string;
  name: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(command.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(command.email);
    }

    const passwordHash = createHash('sha256')
      .update(command.password)
      .digest('hex');

    const now = new Date();

    const user = new User(
      randomUUID(),
      command.email,
      command.name,
      now,
      now,
      undefined,
      passwordHash,
    );

    await this.userRepository.save(user);

    return user;
  }
}
