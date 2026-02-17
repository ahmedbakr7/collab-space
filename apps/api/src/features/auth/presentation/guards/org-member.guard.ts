import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';

@Injectable()
export class OrgMemberGuard implements CanActivate {
  private readonly logger = new Logger(OrgMemberGuard.name);

  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const orgId = request.params.orgId ?? request.params.id;

    if (!orgId) {
      this.logger.warn('OrgMemberGuard: no orgId found in route params');
      throw new ForbiddenException('Organization ID is required');
    }

    if (!user?.id) {
      this.logger.warn(
        'OrgMemberGuard: no user on request (SupabaseAuthGuard must run first)',
      );
      throw new ForbiddenException('Authentication required');
    }

    const membership = await this.prisma.organizationMember.findUnique({
      where: {
        orgId_userId: {
          orgId,
          userId: user.id,
        },
      },
    });

    if (!membership) {
      this.logger.warn(
        `User ${user.id} is not a member of organization ${orgId}`,
      );
      throw new ForbiddenException('You are not a member of this organization');
    }

    return true;
  }
}
