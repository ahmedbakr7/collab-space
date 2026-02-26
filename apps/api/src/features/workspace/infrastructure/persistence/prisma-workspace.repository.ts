import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../application/ports/workspace.repository.interface';
import { Workspace } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { WorkspaceMapper } from '../mappers/workspace.mapper';
import {
  buildPrismaWhere,
  buildPrismaOrderBy,
  buildPrismaPagination,
  buildPaginatedResult,
} from '../../../../shared/query/prisma-query.builder';

const WORKSPACE_FILTER_FIELD_MAP: Record<string, string> = {
  name: 'name',
};

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

  async findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Workspace | null> {
    const where: any = { id };
    if (filter?.userId) {
      where.organization = { members: { some: { userId: filter.userId } } };
    }
    const workspace = await this.prisma.workspace.findFirst({
      where,
    });
    return workspace ? WorkspaceMapper.toDomain(workspace) : null;
  }

  async findAll(
    filter?: { orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>> {
    const where: any = {
      ...buildPrismaWhere(query?.filters, WORKSPACE_FILTER_FIELD_MAP),
    };

    if (filter?.orgId) {
      where.orgId = filter.orgId;
    }
    if (filter?.userId) {
      where.organization = { members: { some: { userId: filter.userId } } };
    }

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [workspaces, total] = await Promise.all([
      this.prisma.workspace.findMany({ where, orderBy, skip, take }),
      this.prisma.workspace.count({ where }),
    ]);

    return buildPaginatedResult(
      workspaces.map(WorkspaceMapper.toDomain),
      total,
      query?.pagination,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workspace.delete({
      where: { id },
    });
  }
}
