import { Task } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';

export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(filter?: {
    projectId?: string;
    userId?: string;
  }): Promise<Task[]> {
    return this.taskRepository.findAll(filter);
  }
}
