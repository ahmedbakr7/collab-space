import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRepository } from '../../../user/application/ports/user.repository.interface';
import { UserRepositoryToken } from '../../../user/presentation/users.module';
import { AuthUser } from '@repo/domain';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const active = await super.canActivate(context);
    if (!active) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    // The strategy returns AuthUser which has the ID from the token
    const authUser = request.user as AuthUser;

    // Use the ID to start looking up the user in our database
    const user = await this.userRepository.findById(authUser.id);

    if (!user) {
      // User has a valid token but does not exist in our database
      throw new UnauthorizedException('User not found in database');
    }

    // Replace the tech-specific AuthUser with our Domain User entity
    request.user = user;

    return true;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
