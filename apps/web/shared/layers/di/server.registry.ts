import { DependencyContainer } from 'tsyringe';
import { TYPES } from './types';
import { WorkspaceRepositoryAdapter } from '@/features/workspace/infrastructure/adapters/workspace.repository.adapter';

export function registerServerDependencies(container: DependencyContainer) {
  // Register server-side adapters here
  container.register(TYPES.IWorkspaceRepository, {
    useClass: WorkspaceRepositoryAdapter,
  });
}
