import 'reflect-metadata';
import { container } from 'tsyringe';
import { ORGANIZATION_REPOSITORY_TOKEN } from '@/features/organization/application/ports/organization.repository.port';
import { OrganizationRepositoryAdapter } from '@/features/organization/infrastructure/adapters/organization.repository.adapter';

import { TYPES } from '@/shared/layers/di/types';
import { WorkspaceRepositoryAdapter } from '@/features/workspace/infrastructure/adapters/workspace.repository.adapter';
import { ProjectRepositoryAdapter } from '@/features/project/infrastructure/adapters/project.repository.adapter';
import { TaskRepositoryAdapter } from '@/features/task/infrastructure/adapters/task.repository.adapter';

// Register Organization feature dependencies
container.register(ORGANIZATION_REPOSITORY_TOKEN, {
  useClass: OrganizationRepositoryAdapter,
});

// Register Workspace feature dependencies
container.register(TYPES.IWorkspaceRepository, {
  useClass: WorkspaceRepositoryAdapter,
});

// Register Project feature dependencies
container.register(TYPES.IProjectRepository, {
  useClass: ProjectRepositoryAdapter,
});

// Register Task feature dependencies
container.register(TYPES.ITaskRepository, {
  useClass: TaskRepositoryAdapter,
});

export { container as clientContainer };
