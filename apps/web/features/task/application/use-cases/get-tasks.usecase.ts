import { injectable, inject } from 'tsyringe';
import type {
  TaskRepositoryPort,
  GetTasksInput,
} from '../ports/task.repository.port';
import { TYPES } from '../../../../shared/layers/di/types';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import type { PaginatedResult } from '@repo/domain';

@injectable()
export class GetTasksUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private readonly repository: TaskRepositoryPort,
  ) {}

  async execute(input?: GetTasksInput): Promise<PaginatedResult<Task>> {
    return this.repository.getTasks(input?.filter, input?.query);
  }
}
