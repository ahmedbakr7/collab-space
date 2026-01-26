import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { AuthPort } from '../ports/auth.port';

@injectable()
export class LoginUseCase {
  constructor(@inject(TYPES.IAuthRepository) private authPort: AuthPort) {}

  async execute(params: { email: string; password: string }): Promise<void> {
    await this.authPort.login(params.email, params.password);
  }
}
