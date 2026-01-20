import { AppError } from '../../../../shared/app.error';

export class TagNotFoundError extends AppError {
  public readonly code = 'TAG_NOT_FOUND';
  constructor(id: string) {
    super(`Tag with id ${id} not found`);
  }
}

export class TagAlreadyExistsError extends AppError {
  public readonly code = 'TAG_ALREADY_EXISTS';
  constructor(name: string) {
    super(`Tag with name ${name} already exists in this organization`);
  }
}
