import { TaskRepositoryPort, TaskFilter } from '../ports/task.repository.port';
import { Task } from '@repo/domain/src/task/entities/task.entity';

export class GetTasksUseCase {
  constructor(private readonly repository: TaskRepositoryPort) {}

  async execute(filter?: TaskFilter): Promise<Task[]> {
    return this.repository.getTasks(filter);
  }
}
