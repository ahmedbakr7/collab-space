import { AuthSession, AuthUser } from '@repo/domain';
import { LoginUserDto, RegisterUserDto } from '../dto/auth.dto';

export interface AuthServiceInterface {
  register(
    dto: RegisterUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession | null }>;
  login(dto: LoginUserDto): Promise<{ user: AuthUser; session: AuthSession }>;
  logout(accessToken: string): Promise<void>;
  validateToken(token: string): Promise<AuthUser>;
}
