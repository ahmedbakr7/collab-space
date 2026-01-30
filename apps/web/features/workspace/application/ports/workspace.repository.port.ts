import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';

export interface WorkspaceRepositoryPort {
  getAllWorkspaces(orgId: string): Promise<Workspace[]>;
  getWorkspace(id: string): Promise<Workspace | null>;
}
