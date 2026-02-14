import { DependencyContainer } from 'tsyringe';
import { TYPES } from './types';
import { WorkspaceRepositoryAdapter } from '@/features/workspace/infrastructure/adapters/workspace.repository.adapter';
import { ORGANIZATION_REPOSITORY_TOKEN } from '@/features/organization/application/ports/organization.repository.port';
import { OrganizationRepositoryAdapter } from '@/features/organization/infrastructure/adapters/organization.repository.adapter';
import { API_CLIENT_TOKEN } from '@/features/shared/application/ports/api-client.port';
import { ServerApiClient } from '@/features/shared/infrastructure/server-api-client';

export function registerServerDependencies(container: DependencyContainer) {
  // Register server-side API client (uses cookies for auth tokens)
  container.register(API_CLIENT_TOKEN, {
    useClass: ServerApiClient,
  });

  // Register server-side adapters
  container.register(ORGANIZATION_REPOSITORY_TOKEN, {
    useClass: OrganizationRepositoryAdapter,
  });
  container.register(TYPES.IWorkspaceRepository, {
    useClass: WorkspaceRepositoryAdapter,
  });
}
