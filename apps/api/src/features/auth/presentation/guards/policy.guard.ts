import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { ResourceType } from './resource-type.enum';
import {
  POLICY_RESOURCE,
  POLICY_PARAM_KEY,
} from '../decorators/check-policy.decorator';

@Injectable()
export class PolicyGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(PolicyGuard.name);
  private prisma: PrismaService;

  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    this.prisma = this.moduleRef.get(PrismaService, { strict: false });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const resourceType = this.reflector.get<ResourceType>(
      POLICY_RESOURCE,
      context.getHandler(),
    );
    const paramKey = this.reflector.get<string>(
      POLICY_PARAM_KEY,
      context.getHandler(),
    );

    // No @CheckPolicy decorator → no policy check required
    if (!resourceType || !paramKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId: string | undefined = request.user?.id;

    if (!userId) {
      this.logger.warn(
        'PolicyGuard: no user on request (SupabaseAuthGuard must run first)',
      );
      throw new NotFoundException();
    }

    const resourceId: string | undefined = request.params[paramKey];

    if (!resourceId) {
      this.logger.warn(
        `PolicyGuard: param "${paramKey}" not found in route params`,
      );
      throw new NotFoundException();
    }

    const resource = await this.verifyOwnership(
      resourceType,
      resourceId,
      userId,
    );

    // Attach the fetched resource to the request to avoid redundant queries
    request.resource = resource;

    return true;
  }

  /**
   * Climbs the resource tree up to Organization and verifies
   * that the requesting user is a member.
   *
   * Throws `NotFoundException` if the resource doesn't exist
   * OR the user is not a member (prevents ID leaking).
   */
  private async verifyOwnership(
    resourceType: ResourceType,
    resourceId: string,
    userId: string,
  ): Promise<unknown> {
    switch (resourceType) {
      case ResourceType.ORGANIZATION:
        return this.verifyOrganization(resourceId, userId);
      case ResourceType.WORKSPACE:
        return this.verifyWorkspace(resourceId, userId);
      case ResourceType.PROJECT:
        return this.verifyProject(resourceId, userId);
      case ResourceType.TASK:
        return this.verifyTask(resourceId, userId);
      case ResourceType.COMMENT:
        return this.verifyComment(resourceId, userId);
      default:
        this.logger.error(`Unknown resource type: ${resourceType}`);
        throw new NotFoundException();
    }
  }

  // ──────────────────────────────────────────────────
  //  Verification methods
  // ──────────────────────────────────────────────────

  private async verifyOrganization(
    orgId: string,
    userId: string,
  ): Promise<unknown> {
    const org = await this.prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        members: { where: { userId }, take: 1 },
      },
    });

    if (!org || org.members.length === 0) {
      this.logger.warn(
        `PolicyGuard: ORGANIZATION ${orgId} not found or user ${userId} not a member`,
      );
      throw new NotFoundException();
    }

    return org;
  }

  private async verifyWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<unknown> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        organization: {
          include: {
            members: { where: { userId }, take: 1 },
          },
        },
      },
    });

    if (!workspace || workspace.organization.members.length === 0) {
      this.logger.warn(
        `PolicyGuard: WORKSPACE ${workspaceId} not found or user ${userId} not a member`,
      );
      throw new NotFoundException();
    }

    return workspace;
  }

  private async verifyProject(
    projectId: string,
    userId: string,
  ): Promise<unknown> {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        workspace: {
          include: {
            organization: {
              include: {
                members: { where: { userId }, take: 1 },
              },
            },
          },
        },
      },
    });

    if (!project || project.workspace.organization.members.length === 0) {
      this.logger.warn(
        `PolicyGuard: PROJECT ${projectId} not found or user ${userId} not a member`,
      );
      throw new NotFoundException();
    }

    return project;
  }

  private async verifyTask(taskId: string, userId: string): Promise<unknown> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          include: {
            workspace: {
              include: {
                organization: {
                  include: {
                    members: { where: { userId }, take: 1 },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!task || task.project.workspace.organization.members.length === 0) {
      this.logger.warn(
        `PolicyGuard: TASK ${taskId} not found or user ${userId} not a member`,
      );
      throw new NotFoundException();
    }

    return task;
  }

  private async verifyComment(
    commentId: string,
    userId: string,
  ): Promise<unknown> {
    const comment = await this.prisma.taskComment.findUnique({
      where: { id: commentId },
      include: {
        task: {
          include: {
            project: {
              include: {
                workspace: {
                  include: {
                    organization: {
                      include: {
                        members: { where: { userId }, take: 1 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (
      !comment ||
      comment.task.project.workspace.organization.members.length === 0
    ) {
      this.logger.warn(
        `PolicyGuard: COMMENT ${commentId} not found or user ${userId} not a member`,
      );
      throw new NotFoundException();
    }

    return comment;
  }
}
