import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { AuthPort } from '../ports/auth.port';

@injectable()
export class SignupUseCase {
  constructor(@inject(TYPES.IAuthRepository) private authPort: AuthPort) {}

  async execute(params: {
    email: string;
    password: string;
    name: string;
    company?: string;
  }): Promise<void> {
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(params.email)}`;

    await this.authPort.signup(params.email, params.password, {
      full_name: params.name,
      company: params.company,
      avatarUrl,
    });
  }
}
