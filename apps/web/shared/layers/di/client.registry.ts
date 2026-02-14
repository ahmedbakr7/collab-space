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
import { InMemoryProjectRepository } from '../../../features/project/infrastructure/repositories/in-memory-project.repository';
import { GetProjectsByWorkspaceUseCase } from '../../../features/project/application/use-cases/get-projects-by-workspace.usecase';

// Task
import { InMemoryTaskRepository } from '../../../features/task/infrastructure/repositories/in-memory-task.repository';
import { GetTasksUseCase } from '../../../features/task/application/use-cases/get-tasks.usecase';

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
