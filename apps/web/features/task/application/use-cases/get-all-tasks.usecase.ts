import { TaskRepositoryPort } from '../ports/task.repository.port';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export class GetAllTasksUseCase {
  constructor(private readonly repository: TaskRepositoryPort) {}

  async execute(query?: QueryOptions): Promise<PaginatedResult<Task>> {
    return this.repository.getTasks(undefined, query);
  }
}
