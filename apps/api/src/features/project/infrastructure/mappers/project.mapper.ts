import { Project as PrismaProject } from '@prisma/client';
import { Project, ProjectStatus } from '@repo/domain';

export class ProjectMapper {
  static toDomain(prismaProject: PrismaProject): Project {
    return new Project(
      prismaProject.id,
      prismaProject.workspaceId,
      prismaProject.name,
      prismaProject.description,
      // @ts-ignore - status is not yet in prisma schema, default to active
      (prismaProject.status as ProjectStatus) || 'active',
      prismaProject.createdAt,
      prismaProject.updatedAt,
    );
  }
}
