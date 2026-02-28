import { injectable } from 'tsyringe';
import type { AuthPort } from '../../application/ports/auth.port';

@injectable()
export class MockAuthAdapter implements AuthPort {
  // This is a mock internal state for demonstration purposes
  private users: {
    email: string;
    password: string;
    full_name?: string;
    company?: string;
    avatarUrl?: string;
  }[] = [];

  async login(email: string, password: string): Promise<void> {
    console.log('MockAuthAdapter: Logging in with', email, password);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async signup(params: {
    email: string;
    password: string;
    full_name?: string;
    company?: string;
    avatarUrl?: string;
  }): Promise<void> {
    const { email, password, full_name, company, avatarUrl } = params;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Add new user to mock storage
    this.users.push({ email, password, full_name, company, avatarUrl });
    console.log('MockAuthAdapter: Signing up with', email, 'and data:', {
      full_name,
      company,
      avatarUrl,
    });
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
