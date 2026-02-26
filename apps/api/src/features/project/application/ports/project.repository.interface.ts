import { Project } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Project | null>;
  findAll(
    filter?: { workspaceId?: string; orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>>;
  findByWorkspaceId(workspaceId: string): Promise<Project[]>;
  delete(id: string): Promise<void>;
}
