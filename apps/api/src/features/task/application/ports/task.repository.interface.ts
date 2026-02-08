import { Task } from '@repo/domain';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Task | null>;
  findAll(filter?: { projectId?: string; userId?: string }): Promise<Task[]>;
  findByProjectId(projectId: string): Promise<Task[]>;
  delete(id: string): Promise<void>;
}
