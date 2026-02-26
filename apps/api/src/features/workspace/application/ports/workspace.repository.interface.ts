import { Workspace } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface WorkspaceRepository {
  save(workspace: Workspace): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Workspace | null>;
  findAll(
    filter?: { orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>>;
  delete(id: string): Promise<void>;
}
