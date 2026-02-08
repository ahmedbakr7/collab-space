import { Task } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';
import { TaskNotFoundError } from '../errors/task.errors';

export class GetTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string, userId?: string): Promise<Task> {
    const task = await this.taskRepository.findById(id, { userId });

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    return task;
  }
}
