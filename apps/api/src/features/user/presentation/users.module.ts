import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../application/use-cases/get-users.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { PrismaUserRepository } from '../infrastructure/persistence/prisma-user.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { UserRepository } from '../application/ports/user.repository.interface';
import { AuthModule } from '../../auth/auth.module';

// Define the token for dependency injection
export const UserRepositoryToken = 'UserRepository';

@Module({
  imports: [forwardRef(() => AuthModule)],
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
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new UpdateUserUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
    {
      provide: DeleteUserUseCase,
      useFactory: (userRepository: UserRepository) =>
        new DeleteUserUseCase(userRepository),
      inject: [UserRepositoryToken],
    },
  ],
  exports: [UserRepositoryToken],
})
export class UsersModule {}
