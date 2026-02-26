import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { CreateWorkspaceDTO } from '../dto/create-workspace.dto';

export interface WorkspaceRepositoryPort {
  getAllWorkspaces(
    orgId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>>;
  getWorkspace(id: string): Promise<Workspace | null>;
  createWorkspace(data: CreateWorkspaceDTO): Promise<Workspace>;
}
