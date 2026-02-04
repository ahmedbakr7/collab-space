import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUser } from '@repo/domain';

@Injectable()
export class SupabaseJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SUPABASE_KEY?.startsWith('sb_secret')
        ? process.env.SUPABASE_KEY
        : process.env.SUPABASE_JWT_SECRET,
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
