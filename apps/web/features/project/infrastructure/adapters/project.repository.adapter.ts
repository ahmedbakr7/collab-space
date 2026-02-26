import { injectable } from 'tsyringe';
import { ProjectRepositoryPort } from '../../application/ports/project.repository.port';
import {
  Project,
  ProjectStatus,
} from '@repo/domain/src/project/entities/project.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { apiClient } from '@/features/shared/infrastructure/api-client';
import { buildQueryParams } from '@/features/shared/infrastructure/query-params.builder';

@injectable()
export class ProjectRepositoryAdapter implements ProjectRepositoryPort {
  async getProjectsByWorkspace(
    workspaceId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>> {
    const result = await apiClient.get<PaginatedResult<Project>>(
      `/workspaces/${workspaceId}/projects`,
      { params: buildQueryParams(query) },
    );
    return {
      data: result.data.map(this.mapToEntity),
      meta: result.meta,
    };
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const project = await apiClient.get<Project>(`/projects/${id}`);
      return this.mapToEntity(project);
    } catch (error) {
      return null;
    }
  }

  private mapToEntity(data: any): Project {
    return new Project(
      data.id,
      data.workspaceId,
      data.name,
      data.description,
      (data.status as ProjectStatus) || 'active',
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
