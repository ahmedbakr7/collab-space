import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryUserRepository } from '../../infrastructure/persistence/in-memory-user.repository';
import { UserAlreadyExistsError } from '../errors/user.errors';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: InMemoryUserRepository;

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(repository);
  });

  it('should create a user successfully', async () => {
    const command = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const result = await useCase.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value.email).toBe(command.email);
      expect(result.value.name).toBe(command.name);
      expect(result.value.id).toBeDefined();
    }
  });

  it('should return error if user already exists', async () => {
    const command = {
      email: 'existing@example.com',
      name: 'Existing User',
    };

    // Create first user
    await useCase.execute(command);

    // Try to create again
    const result = await useCase.execute(command);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toBeInstanceOf(UserAlreadyExistsError);
    }
  });
});
