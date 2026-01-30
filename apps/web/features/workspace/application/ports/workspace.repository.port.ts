import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { CreateWorkspaceDTO } from '../dto/create-workspace.dto';

export interface WorkspaceRepositoryPort {
  getAllWorkspaces(orgId: string): Promise<Workspace[]>;
  getWorkspace(id: string): Promise<Workspace | null>;
  createWorkspace(data: CreateWorkspaceDTO): Promise<Workspace>;
}
