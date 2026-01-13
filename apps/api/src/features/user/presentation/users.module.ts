import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../application/use-cases/get-users.use-case';
import { InMemoryUserRepository } from '../infrastructure/persistence/in-memory-user.repository';
import { UserRepository } from '../application/ports/user.repository.interface';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userService: UserRepository) =>
        new CreateUserUseCase(userService),
      inject: ['UserRepository'],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userService: UserRepository) =>
        new GetUserUseCase(userService),
      inject: ['UserRepository'],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userService: UserRepository) =>
        new GetUsersUseCase(userService),
      inject: ['UserRepository'],
    },
  ],
  exports: [],
})
export class UsersModule {}
