import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Task } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';

export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(
    filter?: { projectId?: string; orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Task>> {
    return this.taskRepository.findAll(filter, query);
  }
}
