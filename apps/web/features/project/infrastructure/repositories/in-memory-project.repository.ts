import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { ProjectRepositoryPort } from '../../application/ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { MOCK_PROJECTS } from '@/features/shared/data/mock-data';

@injectable()
export class InMemoryProjectRepository implements ProjectRepositoryPort {
  async getProjectsByWorkspace(
    workspaceId: string,
    _query?: QueryOptions,
  ): Promise<PaginatedResult<Project>> {
    const projects = MOCK_PROJECTS.filter((p) => p.workspaceId === workspaceId);
    return {
      data: projects,
      meta: {
        page: 1,
        limit: projects.length,
        total: projects.length,
        totalPages: 1,
      },
    };
  }

  async getProject(id: string): Promise<Project | null> {
    return MOCK_PROJECTS.find((p) => p.id === id) || null;
  }
}
