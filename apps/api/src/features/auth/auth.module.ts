import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { LogoutUserUseCase } from './application/use-cases/logout-user.use-case';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { SupabaseAuthService } from './infrastructure/supabase-auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import {
  UsersModule,
  UserRepositoryToken,
} from '../user/presentation/users.module';
import { SupabaseAuthGuard } from './presentation/guards/supabase-auth.guard';
import { SyncUserAvatarUseCase } from '../user/application/use-cases/sync-user-avatar.use-case';
import { AvatarSyncInterceptor } from './presentation/interceptors/avatar-sync.interceptor';
import { UserRepository } from '../user/application/ports/user.repository.interface';
import { AuthServiceInterface } from './application/ports/auth.service.interface';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthServiceInterface',
      useClass: SupabaseAuthService,
    },
    {
      provide: SyncUserAvatarUseCase,
      useFactory: (
        userRepo: UserRepository,
        authService: AuthServiceInterface,
      ) => new SyncUserAvatarUseCase(userRepo, authService),
      inject: [UserRepositoryToken, 'AuthServiceInterface'],
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AvatarSyncInterceptor,
    },
    SupabaseAuthGuard,
    RegisterUserUseCase,
    LoginUserUseCase,
    LogoutUserUseCase,
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    LogoutUserUseCase,
    SupabaseAuthGuard,
  ],
})
export class AuthModule {}
