import { WorkspaceRepositoryPort } from '../../application/ports/workspace.repository.port';
import {
  Organization,
  Visibility,
} from '@repo/domain/src/organization/entities/organization.entity';
import { MOCK_WORKSPACES } from '@/features/shared/data/mock-data';

export class InMemoryWorkspaceRepository implements WorkspaceRepositoryPort {
  async getAllWorkspaces(): Promise<Organization[]> {
    return MOCK_WORKSPACES;
  }

  async getWorkspace(idOrSlug: string): Promise<Organization | null> {
    const ws = MOCK_WORKSPACES.find(
      (w) =>
        w.id === idOrSlug ||
        w.slug === idOrSlug ||
        w.name.toLowerCase().replace(' ', '-') === idOrSlug,
    );
    return ws || null;
  }
}
