import { AppError } from '../../../../shared/app.error';

export class ProjectNotFoundError extends AppError {
  public readonly code = 'PROJECT_NOT_FOUND';
  constructor(id: string) {
    super(`Project with id ${id} not found`);
  }
}

export class ProjectAlreadyExistsError extends AppError {
  public readonly code = 'PROJECT_ALREADY_EXISTS';
  constructor(slug: string) {
    super(`Project with slug ${slug} already exists in this organization`);
  }
}
