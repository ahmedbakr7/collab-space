import { injectable } from 'tsyringe';
import { createClient } from '@/shared/lib/supabase/client';
import type { AuthPort } from '../../application/ports/auth.port';

@injectable()
export class SupabaseAuthAdapter implements AuthPort {
  private supabase = createClient();

  async login(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
  }

  async signup(params: {
    email: string;
    password: string;
    full_name?: string;
    avatarUrl?: string;
  }): Promise<void> {
    const { email, password, ...data } = params;
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data,
      },
    });

    if (error) {
      if (error.message === 'User already registered') {
        throw new Error('An account with this email already exists.');
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async getUser(): Promise<any> {
    try {
      const {
        data: { user },
        error,
      } = await this.supabase.auth.getUser();

      if (error) {
        if (error.message.includes('Invalid Refresh Token')) {
          // Clear invalid session
          await this.supabase.auth.signOut();
          return null;
        }
        // For other errors, we might want to log them but return null to avoid blocking UI
        console.warn('Auth check failed:', error.message);
        return null;
      }
      return user;
    } catch (error) {
      console.warn('Auth check exception:', error);
      return null;
    }
  }
}
