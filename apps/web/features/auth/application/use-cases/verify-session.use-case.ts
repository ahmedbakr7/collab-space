import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { AuthPort } from '../ports/auth.port';

@injectable()
export class VerifySessionUseCase {
  constructor(@inject(TYPES.IAuthRepository) private authPort: AuthPort) {}

  async execute(): Promise<any> {
    return await this.authPort.getUser();
  }
}
