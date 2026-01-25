import { TaskRepositoryPort } from '../ports/task.repository.port';
import { Task } from '@repo/domain/src/task/entities/task.entity';

export class GetAllTasksUseCase {
  constructor(private readonly repository: TaskRepositoryPort) {}

  async execute(): Promise<Task[]> {
    return this.repository.getTasks();
  }
}
