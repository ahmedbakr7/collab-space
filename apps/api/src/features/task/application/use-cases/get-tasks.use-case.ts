import { Task } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';

export class GetTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(projectId?: string): Promise<Task[]> {
    if (projectId) {
      return this.taskRepository.findByProjectId(projectId);
    }
    return this.taskRepository.findAll();
  }
}
