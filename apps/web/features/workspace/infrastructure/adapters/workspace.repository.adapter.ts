import { injectable } from 'tsyringe';
import { WorkspaceRepositoryPort } from '../../application/ports/workspace.repository.port';
import { CreateWorkspaceDTO } from '../../application/dto/create-workspace.dto';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { apiClient } from '@/features/shared/infrastructure/api-client';

@injectable()
export class WorkspaceRepositoryAdapter implements WorkspaceRepositoryPort {
  async getAllWorkspaces(orgId: string): Promise<Workspace[]> {
    const workspaces = await apiClient.get<Workspace[]>(
      `/organizations/${orgId}/workspaces`,
    );
    return workspaces.map(this.mapToEntity);
  }

  async createWorkspace(data: CreateWorkspaceDTO): Promise<Workspace> {
    const workspace = await apiClient.post<Workspace>(
      `/organizations/${data.organizationId}/workspaces`,
      data,
    );
    return this.mapToEntity(workspace);
  }

  async getWorkspace(id: string): Promise<Workspace | null> {
    try {
      const workspace = await apiClient.get<Workspace>(`/workspaces/${id}`);
      return this.mapToEntity(workspace);
    } catch (error) {
      return null;
    }
  }

  private mapToEntity(data: any): Workspace {
    return new Workspace(
      data.id,
      data.orgId,
      data.name,
      data.description,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
