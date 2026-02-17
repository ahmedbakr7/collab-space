import { Workspace } from '@repo/domain';

export interface WorkspaceRepository {
  save(workspace: Workspace): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Workspace | null>;
  findAll(filter?: { orgId?: string; userId?: string }): Promise<Workspace[]>;
  delete(id: string): Promise<void>;
}
