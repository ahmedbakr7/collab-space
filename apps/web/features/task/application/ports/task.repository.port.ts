import { Task } from '@repo/domain/src/task/entities/task.entity';

export interface TaskFilter {
  projectId?: string;
  workspaceId?: string;
  assigneeId?: string;
}

export interface TaskRepositoryPort {
  getTasks(filter?: TaskFilter): Promise<Task[]>;
}
