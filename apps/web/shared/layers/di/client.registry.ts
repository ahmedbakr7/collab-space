import { DependencyContainer } from 'tsyringe';
import { TYPES } from './types';

// Shared
import { API_CLIENT_TOKEN } from '@/features/shared/application/ports/api-client.port';
import { ApiClient } from '../../../features/shared/infrastructure/api-client';

// Auth
import { SupabaseAuthAdapter } from '../../../features/auth/infrastructure/adapters/supabase-auth.adapter';
import { LoginUseCase } from '../../../features/auth/application/use-cases/login.use-case';
import { SignupUseCase } from '../../../features/auth/application/use-cases/signup.use-case';
import { LogoutUseCase } from '../../../features/auth/application/use-cases/logout.use-case';
import { VerifySessionUseCase } from '../../../features/auth/application/use-cases/verify-session.use-case';

// Project
import { ProjectRepositoryAdapter } from '../../../features/project/infrastructure/adapters/project.repository.adapter';
import { GetProjectsByWorkspaceUseCase } from '../../../features/project/application/use-cases/get-projects-by-workspace.usecase';

// Workspace
import { WorkspaceRepositoryAdapter } from '../../../features/workspace/infrastructure/adapters/workspace.repository.adapter';
import { GetAllWorkspacesUseCase } from '../../../features/workspace/application/use-cases/get-all-workspaces.usecase';

// Task
import { TaskRepositoryAdapter } from '../../../features/task/infrastructure/adapters/task.repository.adapter';
import { GetTasksUseCase } from '../../../features/task/application/use-cases/get-tasks.usecase';

// Dashboard
import { InMemoryDashboardRepository } from '../../../features/dashboard/infrastructure/repositories/in-memory-dashboard.repository';
import { GetDashboardDataUseCase } from '../../../features/dashboard/application/use-cases/get-dashboard-data.usecase';

export function registerClientDependencies(container: DependencyContainer) {
  // Shared - Browser API client (uses browser Supabase session for auth tokens)
  container.register(API_CLIENT_TOKEN, { useClass: ApiClient });

  // Auth
  container.register(TYPES.IAuthRepository, { useClass: SupabaseAuthAdapter });
  container.register(TYPES.ILoginUseCase, { useClass: LoginUseCase });
  container.register(TYPES.ISignupUseCase, { useClass: SignupUseCase });
  container.register(TYPES.ILogoutUseCase, { useClass: LogoutUseCase });
  container.register(TYPES.IVerifySessionUseCase, {
    useClass: VerifySessionUseCase,
  });

  // Project
  container.register(TYPES.IProjectRepository, {
    useClass: ProjectRepositoryAdapter,
  });
  container.register(TYPES.IGetProjectsByWorkspaceUseCase, {
    useClass: GetProjectsByWorkspaceUseCase,
  });

  // Workspace
  container.register(TYPES.IWorkspaceRepository, {
    useClass: WorkspaceRepositoryAdapter,
  });
  container.register(TYPES.IGetAllWorkspacesUseCase, {
    useClass: GetAllWorkspacesUseCase,
  });

  // Task
  container.register(TYPES.ITaskRepository, {
    useClass: TaskRepositoryAdapter,
  });
  container.register(TYPES.IGetTasksUseCase, { useClass: GetTasksUseCase });

  // Dashboard
  // Keeping in-memory for Dashboard if there is no real adapter yet
  container.register(TYPES.IDashboardRepository, {
    useClass: InMemoryDashboardRepository,
  });
  container.register(TYPES.IGetDashboardDataUseCase, {
    useClass: GetDashboardDataUseCase,
  });
}
