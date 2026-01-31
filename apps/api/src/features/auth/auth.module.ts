import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { LogoutUserUseCase } from './application/use-cases/logout-user.use-case';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { SupabaseAuthService } from './infrastructure/supabase-auth.service';
import { AuthController } from './presentation/controllers/auth.controller';
import { UsersModule } from '../user/presentation/users.module';
import { SupabaseAuthGuard } from './presentation/guards/supabase-auth.guard';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthServiceInterface',
      useClass: SupabaseAuthService,
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
