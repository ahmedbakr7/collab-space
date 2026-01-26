import { DependencyContainer } from 'tsyringe';
import { TYPES } from './types';

// Auth
import { MockAuthAdapter } from '../../../features/auth/infrastructure/adapters/mock-auth.adapter';
import { LoginUseCase } from '../../../features/auth/application/use-cases/login.use-case';

// Project
import { InMemoryProjectRepository } from '../../../features/project/infrastructure/repositories/in-memory-project.repository';
import { GetProjectsByWorkspaceUseCase } from '../../../features/project/application/use-cases/get-projects-by-workspace.usecase';

// Task
import { InMemoryTaskRepository } from '../../../features/task/infrastructure/repositories/in-memory-task.repository';
import { GetTasksUseCase } from '../../../features/task/application/use-cases/get-tasks.usecase';

export function registerClientDependencies(container: DependencyContainer) {
  // Auth
  container.register(TYPES.IAuthRepository, { useClass: MockAuthAdapter });
  container.register(TYPES.ILoginUseCase, { useClass: LoginUseCase });

  // Project
  container.register(TYPES.IProjectRepository, {
    useClass: InMemoryProjectRepository,
  });
  container.register(TYPES.IGetProjectsByWorkspaceUseCase, {
    useClass: GetProjectsByWorkspaceUseCase,
  });

  // Task
  container.register(TYPES.ITaskRepository, {
    useClass: InMemoryTaskRepository,
  });
  container.register(TYPES.IGetTasksUseCase, { useClass: GetTasksUseCase });
}
