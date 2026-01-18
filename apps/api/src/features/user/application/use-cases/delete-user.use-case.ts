import { UserRepository } from '../ports/user.repository.interface';
import { UserNotFoundError } from '../errors/user.errors';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    await this.userRepository.delete(id);
  }
}
