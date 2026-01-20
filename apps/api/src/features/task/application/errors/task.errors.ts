import { AppError } from '../../../../shared/app.error';

export class TaskNotFoundError extends AppError {
  public readonly code = 'TASK_NOT_FOUND';
  constructor(id: string) {
    super(`Task with id ${id} not found`);
  }
}
