import { Workspace as PrismaWorkspace } from '@prisma/client';
import { Workspace } from '@repo/domain';

export class WorkspaceMapper {
  static toDomain(prismaWorkspace: PrismaWorkspace): Workspace {
    return new Workspace(
      prismaWorkspace.id,
      prismaWorkspace.orgId,
      prismaWorkspace.name,
      prismaWorkspace.slug,
      prismaWorkspace.description,
      prismaWorkspace.createdAt,
      prismaWorkspace.updatedAt,
    );
  }
}
