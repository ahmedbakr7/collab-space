import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../application/use-cases/get-users.use-case';
import { PrismaUserRepository } from '../infrastructure/persistence/prisma-user.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { UserRepository } from '../application/ports/user.repository.interface';

// Define the token for dependency injection
const UserRepositoryToken = 'UserRepository';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UserRepositoryToken,
      useClass: PrismaUserRepository,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new CreateUserUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new GetUserUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userRepository: UserRepository) =>
        new GetUsersUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
  ],
  exports: [],
})
export class UsersModule {}
