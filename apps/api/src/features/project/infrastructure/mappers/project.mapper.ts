import { Project as PrismaProject } from '@prisma/client';
import { Project } from '../../domain/entities/project.entity';

export class ProjectMapper {
  static toDomain(prismaProject: PrismaProject): Project {
    return new Project(
      prismaProject.id,
      prismaProject.orgId,
      prismaProject.name,
      prismaProject.description,
      prismaProject.slug,
      prismaProject.createdAt,
      prismaProject.updatedAt,
    );
  }
}
