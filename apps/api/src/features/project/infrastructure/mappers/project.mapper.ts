import { Project as PrismaProject } from '@prisma/client';
import { Project } from '@repo/domain';

export class ProjectMapper {
  static toDomain(prismaProject: PrismaProject): Project {
    return new Project(
      prismaProject.id,
      prismaProject.workspaceId,
      prismaProject.name,
      prismaProject.description,
      prismaProject.slug,
      prismaProject.createdAt,
      prismaProject.updatedAt,
    );
  }
}
