import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createServiceClient } from '@repo/supabase/service';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthSession, AuthUser } from '@repo/domain';
import { LoginUserDto, RegisterUserDto } from '../application/dto/auth.dto';
import {
  AuthProviderError,
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from '../application/errors/auth.error';
import { AuthServiceInterface } from '../application/ports/auth.service.interface';

@Injectable()
export class SupabaseAuthService implements AuthServiceInterface {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseAuthService.name);

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');
    const supabaseKey = this.configService.getOrThrow<string>('SUPABASE_KEY');
    this.supabase = createServiceClient(supabaseUrl, supabaseKey);
  }

  async register(
    dto: RegisterUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession | null }> {
    const { data, error } = await this.supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: {
          ...dto.data,
          name: dto.name,
          avatar_url: dto.avatarUrl,
        },
      },
    });

    if (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      if (error.message.includes('already registered')) {
        throw new UserAlreadyExistsError(dto.email);
      }
      throw new AuthProviderError(error.message);
    }

    if (!data.user) {
      throw new AuthProviderError(
        'Registration successful but no user returned',
      );
    }

    const user = new AuthUser(
      data.user.id,
      data.user.email!,
      data.user.app_metadata || {},
      data.user.user_metadata || {},
      'aal1', // Default or extracted if available in session
      [], // AMR not always available in immediate response
      data.session?.access_token ? 'session_id_placeholder' : '', // We might need to decode the token to get session_id if strictly needed here
      data.user.is_anonymous || false,
    );

    let session: AuthSession | null = null;
    if (data.session) {
      session = new AuthSession(
        data.session.access_token,
        data.session.refresh_token,
        data.session.expires_in,
        data.session.token_type,
      );
    }

    return { user, session };
  }

  async login(
    dto: LoginUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      if (error.message.includes('Invalid login credentials')) {
        throw new InvalidCredentialsError();
      }
      throw new AuthProviderError(error.message);
    }

    if (!data.user || !data.session) {
      throw new AuthProviderError(
        'Login successful but missing user or session',
      );
    }

    const user = new AuthUser(
      data.user.id,
      data.user.email!,
      data.user.app_metadata || {},
      data.user.user_metadata || {},
      'aal1',
      [],
      data.session.access_token ? 'session_id_placeholder' : '',
      data.user.is_anonymous || false,
    );

    const session = new AuthSession(
      data.session.access_token,
      data.session.refresh_token,
      data.session.expires_in,
      data.session.token_type,
    );

    return { user, session };
  }

  async logout(accessToken: string): Promise<void> {
    const { error } = await this.supabase.auth.admin.signOut(accessToken);
    if (error) {
      // We log but might not want to throw if the token is already invalid,
      // effectively treating it as "already logged out" or just failing silently for security.
      // However, Clean Architecture says we should probably let application decide.
      // For now, let's wrap it.
      this.logger.error(`Logout failed: ${error.message}`, error.stack);
      throw new AuthProviderError(error.message);
    }
  }

  async updateUserMetadata(
    id: string,
    metadata: Record<string, any>,
  ): Promise<void> {
    const { error } = await this.supabase.auth.admin.updateUserById(id, {
      user_metadata: metadata,
    });

    if (error) {
      this.logger.error(
        `Failed to update user metadata for ${id}: ${error.message}`,
        error.stack,
      );
      throw new AuthProviderError(error.message);
    }
  }
}
