import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../application/ports/workspace.repository.interface';
import { Workspace } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { WorkspaceMapper } from '../mappers/workspace.mapper';

@Injectable()
export class PrismaWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(workspace: Workspace): Promise<void> {
    await this.prisma.workspace.upsert({
      where: { id: workspace.id },
      update: {
        name: workspace.name,
        description: workspace.description,
        updatedAt: workspace.updatedAt,
      },
      create: {
        id: workspace.id,
        orgId: workspace.orgId,
        name: workspace.name,
        description: workspace.description,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Workspace | null> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id },
    });
    return workspace ? WorkspaceMapper.toDomain(workspace) : null;
  }

  async findAll(filter?: { orgId?: string }): Promise<Workspace[]> {
    const workspaces = await this.prisma.workspace.findMany({
      where: {
        orgId: filter?.orgId,
      },
    });
    return workspaces.map(WorkspaceMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workspace.delete({
      where: { id },
    });
  }
}
