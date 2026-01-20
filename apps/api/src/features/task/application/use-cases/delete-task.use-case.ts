import { TaskRepository } from '../ports/task.repository.interface';
import { TaskNotFoundError } from '../errors/task.errors';

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    await this.taskRepository.delete(id);
  }
}
