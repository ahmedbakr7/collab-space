import { injectable } from 'tsyringe';
import type { AuthPort } from '../../application/ports/auth.port';

@injectable()
export class MockAuthAdapter implements AuthPort {
  async login(email: string, password: string): Promise<void> {
    console.log('MockAuthAdapter: Logging in with', email, password);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async signup(
    email: string,
    password: string,
    data?: Record<string, any>,
  ): Promise<void> {
    console.log('MockAuthAdapter: Signing up with', email, password, data);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async logout(): Promise<void> {
    console.log('MockAuthAdapter: Logging out');
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async getUser(): Promise<any> {
    console.log('MockAuthAdapter: Getting user');
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id: 'mock-user-id', email: 'mock@example.com' };
  }
}
