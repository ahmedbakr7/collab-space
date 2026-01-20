import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginUserUseCase } from './application/use-cases/login-user.use-case';
import { LogoutUserUseCase } from './application/use-cases/logout-user.use-case';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import { SupabaseAuthService } from './infrastructure/external/supabase-auth.service';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AuthServiceInterface',
      useClass: SupabaseAuthService,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
    LogoutUserUseCase,
  ],
  exports: [RegisterUserUseCase, LoginUserUseCase, LogoutUserUseCase],
})
export class AuthModule {}
