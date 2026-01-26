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

  async signup(
    email: string,
    password: string,
    data?: Record<string, any>,
  ): Promise<void> {
    const { error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data,
      },
    });
    if (error) {
      throw error;
    }
  }
}
