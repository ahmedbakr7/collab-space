import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../application/ports/project.repository.interface';
import { Project } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { ProjectMapper } from '../mappers/project.mapper';

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
      where.workspace = { members: { some: { userId: filter.userId } } };
    }
    const project = await this.prisma.project.findUnique({
      where,
    });
    return project ? ProjectMapper.toDomain(project) : null;
  }

  async findAll(filter?: {
    workspaceId?: string;
    userId?: string;
  }): Promise<Project[]> {
    const where: any = {};
    if (filter?.workspaceId) {
      where.workspaceId = filter.workspaceId;
    }
    if (filter?.userId) {
      where.workspace = { members: { some: { userId: filter.userId } } };
    }
    const projects = await this.prisma.project.findMany({ where });
    return projects.map(ProjectMapper.toDomain);
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
