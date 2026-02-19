export const TYPES = {
  // Core Infrastructure
  Database: Symbol.for('Database'),

  // Core Services
  IStorageService: Symbol.for('IStorageService'),

  // Auth Feature
  IAuthRepository: Symbol.for('IAuthRepository'),
  ILoginUseCase: Symbol.for('ILoginUseCase'),
  ILogoutUseCase: Symbol.for('ILogoutUseCase'),
  IVerifySessionUseCase: Symbol.for('IVerifySessionUseCase'),

  // Authentication
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignupUseCase: Symbol.for('ISignupUseCase'),

  // Project Feature
  IProjectRepository: Symbol.for('IProjectRepository'),
  IGetProjectsByWorkspaceUseCase: Symbol.for('IGetProjectsByWorkspaceUseCase'),

  // Workspace Feature
  IWorkspaceRepository: Symbol.for('IWorkspaceRepository'),
  IGetAllWorkspacesUseCase: Symbol.for('IGetAllWorkspacesUseCase'),

  // Task Feature
  ITaskRepository: Symbol.for('ITaskRepository'),
  IGetTasksUseCase: Symbol.for('IGetTasksUseCase'),

  // Dashboard Feature
  IDashboardRepository: Symbol.for('IDashboardRepository'),
  IGetDashboardDataUseCase: Symbol.for('IGetDashboardDataUseCase'),
} as const;

export type DITypes = typeof TYPES;
export { TYPES as DI_KEYS };
