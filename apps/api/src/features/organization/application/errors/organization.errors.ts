import { AppError } from '../../../../shared/app.error';

export class OrganizationNotFoundError extends AppError {
  public readonly code = 'ORGANIZATION_NOT_FOUND';
  constructor(id: string) {
    super(`Organization with id ${id} not found`);
  }
}

export class OrganizationAlreadyExistsError extends AppError {
  public readonly code = 'ORGANIZATION_ALREADY_EXISTS';
  constructor(slug: string) {
    super(`Organization with slug ${slug} already exists`);
  }
}
