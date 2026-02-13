import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserRepository } from '../../../user/application/ports/user.repository.interface';
import { UserRepositoryToken } from '../../../user/presentation/users.module';
import { AuthUser } from '@repo/domain';

import { OnModuleInit } from '@nestjs/common';

@Injectable()
export class SupabaseAuthGuard
  extends AuthGuard('jwt')
  implements OnModuleInit
{
  private readonly logger = new Logger(SupabaseAuthGuard.name);
  private userRepository: UserRepository;

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  async onModuleInit() {
    this.userRepository = await this.moduleRef.get(UserRepositoryToken, {
      strict: false,
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const active = await super.canActivate(context);
    if (!active) {
      this.logger.warn('SupabaseAuthGuard: super.canActivate returned false');
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const authUser = request.user as AuthUser;

    this.logger.log(`Validating user from token: ${authUser.id}`);

    if (!this.userRepository) {
      this.userRepository = await this.moduleRef.get(UserRepositoryToken, {
        strict: false,
      });
    }
    const user = await this.userRepository.findById(authUser.id);

    if (!user) {
      this.logger.warn(
        `User authenticated with Supabase but not found in database: ${authUser.id}`,
      );
      throw new UnauthorizedException('User not found in database');
    }

    request.user = user;
    this.logger.log(`User authenticated successfully: ${user.id}`);

    return true;
  }

  handleRequest(err: any, user: any, _info: any) {
    if (err || !user) {
      this.logger.error(
        `Authentication failed: ${err?.message || 'User not found'}`,
        err?.stack,
      );
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
