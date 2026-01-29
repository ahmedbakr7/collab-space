import { AppError } from '../../../../shared/app.error';

export class WorkspaceAlreadyExistsError extends AppError {
  public readonly code = 'WORKSPACE_ALREADY_EXISTS';
  constructor(slug: string) {
    super(`Workspace with slug "${slug}" already exists`);
  }
}

export class WorkspaceNotFoundError extends AppError {
  public readonly code = 'WORKSPACE_NOT_FOUND';
  constructor(id: string) {
    super(`Workspace with id "${id}" not found`);
  }
}
