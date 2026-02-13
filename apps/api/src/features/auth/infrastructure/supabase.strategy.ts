import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '@repo/domain';
import { createJwksSecretProvider } from './jwks.service';

@Injectable()
export class SupabaseJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;

    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL environment variable is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: createJwksSecretProvider(supabaseUrl),
      algorithms: ['ES256'],
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    // Map the payload to your AuthUser entity
    return new AuthUser(
      payload.sub,
      payload.email,
      payload.app_metadata || {},
      payload.user_metadata || {},
      payload.aal,
      payload.amr || [],
      payload.session_id,
      payload.is_anonymous,
    );
  }
}
