import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { User } from '../../domain/entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let createUserUseCase: CreateUserUseCase;
  let getUserUseCase: GetUserUseCase;
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password',
      };
      const expectedUser = {
        ...dto,
        id: '1',
        passwordHash: 'hash',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as User;

      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(expectedUser);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedUser);
      expect(createUserUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        { id: '1', email: 'test@example.com' } as unknown as User,
      ];

      jest.spyOn(getUsersUseCase, 'execute').mockResolvedValue(expectedUsers);

      const result = await controller.getAll();

      expect(result).toEqual(expectedUsers);
      expect(getUsersUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('get', () => {
    it('should return a user by id', async () => {
      const id = '1';
      const expectedUser = { id, email: 'test@example.com' } as unknown as User;

      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(expectedUser);

      const result = await controller.get(id);

      expect(result).toEqual(expectedUser);
      expect(getUserUseCase.execute).toHaveBeenCalledWith({ id });
    });
  });
});
