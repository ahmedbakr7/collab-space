import { WorkspaceRepositoryPort } from '../../application/ports/workspace.repository.port';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { MOCK_WORKSPACES } from '@/features/shared/data/mock-data';

export class InMemoryWorkspaceRepository implements WorkspaceRepositoryPort {
  async getAllWorkspaces(
    orgId: string,
    _query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>> {
    const workspaces = MOCK_WORKSPACES.map(
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
    return {
      data: workspaces,
      meta: {
        page: 1,
        limit: workspaces.length,
        total: workspaces.length,
        totalPages: 1,
      },
    };
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
