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

  // Project Feature
  IProjectRepository: Symbol.for('IProjectRepository'),
  IGetProjectsByWorkspaceUseCase: Symbol.for('IGetProjectsByWorkspaceUseCase'),

  // Task Feature
  ITaskRepository: Symbol.for('ITaskRepository'),
  IGetTasksUseCase: Symbol.for('IGetTasksUseCase'),
} as const;

export type DITypes = typeof TYPES;
export { TYPES as DI_KEYS };
