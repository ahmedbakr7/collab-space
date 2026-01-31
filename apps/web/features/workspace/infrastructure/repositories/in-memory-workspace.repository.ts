import { WorkspaceRepositoryPort } from '../../application/ports/workspace.repository.port';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { MOCK_WORKSPACES } from '@/features/shared/data/mock-data';

export class InMemoryWorkspaceRepository implements WorkspaceRepositoryPort {
  async getAllWorkspaces(orgId: string): Promise<Workspace[]> {
    // Determine which "workspaces" belong to which org.
    // MOCK_WORKSPACES are Organizations really.
    // For now, let's treat them as if they are workspaces of the given orgId
    // to satisfy the type.
    return MOCK_WORKSPACES.map(
      (org) =>
        new Workspace(
          org.id,
          orgId,
          org.name,
          org.description,
          org.createdAt,
          org.updatedAt,
        ),
    );
  }

  async getWorkspace(id: string): Promise<Workspace | null> {
    const ws = MOCK_WORKSPACES.find((w) => w.id === id);
    if (!ws) return null;
    return new Workspace(
      ws.id,
      'mock-org-id',
      ws.name,
      ws.description,
      ws.createdAt,
      ws.updatedAt,
    );
  }

  async createWorkspace(data: any): Promise<Workspace> {
    throw new Error('Method not implemented.');
  }
}
