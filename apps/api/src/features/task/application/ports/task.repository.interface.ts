import { Task } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Task | null>;
  findAll(
    filter?: { projectId?: string; orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Task>>;
  findByProjectId(projectId: string): Promise<Task[]>;
  delete(id: string): Promise<void>;
}
