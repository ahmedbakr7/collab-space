import { Task } from '@repo/domain/src/task/entities/task.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface TaskFilter {
  projectId?: string;
  workspaceId?: string;
  assigneeId?: string;
}

export interface GetTasksInput {
  filter?: TaskFilter;
  query?: QueryOptions;
}

export interface TaskRepositoryPort {
  getTasks(
    filter?: TaskFilter,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Task>>;
}
