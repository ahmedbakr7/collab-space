import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';
import { RegisterUserDto, LoginUserDto } from '../../application/dto/auth.dto';
import { LoginUserUseCase } from '../../application/use-cases/login-user.use-case';
import { LogoutUserUseCase } from '../../application/use-cases/logout-user.use-case';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import {
  LoginUserRequestDto,
  loginUserSchema,
  RegisterUserRequestDto,
  registerUserSchema,
} from '../dtos/auth-request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly logoutUserUseCase: LogoutUserUseCase,
  ) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async register(@Body() body: RegisterUserRequestDto) {
    const dto = new RegisterUserDto(
      body.email,
      body.password,
      body.name,
      body.avatar,
      body.data,
    );
    return this.registerUserUseCase.execute(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  async login(@Body() body: LoginUserRequestDto) {
    const dto = new LoginUserDto(body.email, body.password);
    return this.loginUserUseCase.execute(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') authorization?: string) {
    if (!authorization) {
      // Technically strict clean architecture might say "missing authorization" is a presentation concern vs domain.
      // But for convenience:
      throw new UnauthorizedException('Missing Authorization header');
    }

    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const token = parts[1];
    await this.logoutUserUseCase.execute(token);
    return { message: 'Logged out successfully' };
  }
}
