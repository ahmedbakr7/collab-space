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
    company?: string;
    avatarUrl?: string;
  }): Promise<void> {
    const { email, password, ...data } = params;
    const { error, data: signupData } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data,
      },
    });
    if (error) {
      throw error;
    }
    console.log(signupData);
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw error;
    }
  }

  async getUser(): Promise<any> {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    return user;
  }
}
