import { AuthSession } from '../../domain/entities/auth-session.entity';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { LoginUserDto, RegisterUserDto } from '../dto/auth.dto';

export interface AuthServiceInterface {
  register(
    dto: RegisterUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession | null }>;
  login(dto: LoginUserDto): Promise<{ user: AuthUser; session: AuthSession }>;
  logout(accessToken: string): Promise<void>;
}
