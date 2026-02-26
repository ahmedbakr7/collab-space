import { Project } from '@repo/domain/src/project/entities/project.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface ProjectRepositoryPort {
  getProjectsByOrganization(
    organizationId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>>;
  getProjectsByWorkspace(
    workspaceId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>>;
  getProject(id: string): Promise<Project | null>;
}
