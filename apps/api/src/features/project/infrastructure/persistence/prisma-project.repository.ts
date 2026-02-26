import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../application/ports/project.repository.interface';
import { Project } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { ProjectMapper } from '../mappers/project.mapper';
import {
  buildPrismaWhere,
  buildPrismaOrderBy,
  buildPrismaPagination,
  buildPaginatedResult,
} from '../../../../shared/query/prisma-query.builder';

const PROJECT_FILTER_FIELD_MAP: Record<string, string> = {
  name: 'name',
};

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(project: Project): Promise<void> {
    await this.prisma.project.upsert({
      where: { id: project.id },
      update: {
        workspaceId: project.workspaceId,
        name: project.name,
        description: project.description,
        updatedAt: project.updatedAt,
      },
      create: {
        id: project.id,
        workspaceId: project.workspaceId,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  }

  async findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Project | null> {
    const where: any = { id };
    if (filter?.userId) {
      where.workspace = {
        organization: { members: { some: { userId: filter.userId } } },
      };
    }
    const project = await this.prisma.project.findUnique({
      where,
    });
    return project ? ProjectMapper.toDomain(project) : null;
  }

  async findAll(
    filter?: { workspaceId?: string; orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>> {
    const where: any = {
      ...buildPrismaWhere(query?.filters, PROJECT_FILTER_FIELD_MAP),
    };

    if (filter?.workspaceId) {
      where.workspaceId = filter.workspaceId;
    }
    if (filter?.orgId || filter?.userId) {
      where.workspace = {
        organization: {
          ...(filter?.orgId ? { id: filter.orgId } : {}),
          ...(filter?.userId
            ? { members: { some: { userId: filter.userId } } }
            : {}),
        },
      };
    }

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({ where, orderBy, skip, take }),
      this.prisma.project.count({ where }),
    ]);

    return buildPaginatedResult(
      projects.map(ProjectMapper.toDomain),
      total,
      query?.pagination,
    );
  }

  async findByWorkspaceId(workspaceId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { workspaceId },
    });
    return projects.map(ProjectMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
