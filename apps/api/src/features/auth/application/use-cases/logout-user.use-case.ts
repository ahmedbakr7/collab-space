import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '../ports/auth.service.interface';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  async execute(accessToken: string): Promise<void> {
    return this.authService.logout(accessToken);
  }
}
