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
        slug: project.slug,
        description: project.description,
        updatedAt: project.updatedAt,
      },
      create: {
        id: project.id,
        workspaceId: project.workspaceId,
        name: project.name,
        slug: project.slug,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    return project ? ProjectMapper.toDomain(project) : null;
  }

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map(ProjectMapper.toDomain);
  }

  async findByWorkspaceId(workspaceId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { workspaceId },
    });
    return projects.map(ProjectMapper.toDomain);
  }

  async findBySlug(workspaceId: string, slug: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { workspaceId, slug },
    });
    return project ? ProjectMapper.toDomain(project) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
