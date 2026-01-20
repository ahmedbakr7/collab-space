import { Inject, Injectable } from '@nestjs/common';
import { AuthSession } from '../../domain/entities/auth-session.entity';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { LoginUserDto } from '../dto/auth.dto';
import { AuthServiceInterface } from '../ports/auth.service.interface';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  async execute(
    dto: LoginUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession }> {
    return this.authService.login(dto);
  }
}
