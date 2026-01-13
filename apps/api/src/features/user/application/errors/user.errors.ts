import { AppError } from '../../../../shared/app.error';

export class UserAlreadyExistsError extends AppError {
  public readonly code = 'USER_ALREADY_EXISTS';
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export class UserNotFoundError extends AppError {
  public readonly code = 'USER_NOT_FOUND';
  constructor(id: string) {
    super(`User with id ${id} not found`);
  }
}
