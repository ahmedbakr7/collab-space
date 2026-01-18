import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../ports/user.repository.interface';
import { UserNotFoundError } from '../errors/user.errors';

export interface GetUserCommand {
  id: string;
}

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: GetUserCommand): Promise<User> {
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new UserNotFoundError(command.id);
    }
    return user;
  }
}
