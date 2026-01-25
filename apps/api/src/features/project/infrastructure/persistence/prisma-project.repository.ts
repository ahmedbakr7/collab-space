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
        orgId: project.orgId,
        name: project.name,
        slug: project.slug,
        description: project.description,
        updatedAt: project.updatedAt,
      },
      create: {
        id: project.id,
        orgId: project.orgId,
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

  async findByOrgId(orgId: string): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      where: { orgId },
    });
    return projects.map(ProjectMapper.toDomain);
  }

  async findBySlug(orgId: string, slug: string): Promise<Project | null> {
    const project = await this.prisma.project.findFirst({
      where: { orgId, slug },
    });
    return project ? ProjectMapper.toDomain(project) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    });
  }
}
