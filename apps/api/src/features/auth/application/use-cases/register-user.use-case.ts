import { Inject, Injectable } from '@nestjs/common';
import { AuthSession } from '../../domain/entities/auth-session.entity';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { RegisterUserDto } from '../dto/auth.dto';
import { AuthServiceInterface } from '../ports/auth.service.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  async execute(
    dto: RegisterUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession | null }> {
    return this.authService.register(dto);
  }
}
