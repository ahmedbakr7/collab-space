import { Task } from '../../domain/entities/task.entity';

export interface TaskRepository {
  save(task: Task): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByProjectId(projectId: string): Promise<Task[]>;
  delete(id: string): Promise<void>;
}
