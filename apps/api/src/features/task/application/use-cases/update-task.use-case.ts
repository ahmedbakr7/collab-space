import { Task, TaskStatus, TaskPriority } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';
import { TaskNotFoundError } from '../errors/task.errors';

export interface UpdateTaskCommand {
  id: string;
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
  assignedToId?: string | null;
}

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskCommand): Promise<Task> {
    const task = await this.taskRepository.findById(command.id);

    if (!task) {
      throw new TaskNotFoundError(command.id);
    }

    const updatedTask = new Task(
      task.id,
      task.projectId,
      command.title ?? task.title,
      command.description ?? task.description,
      command.status ?? task.status,
      command.priority ?? task.priority,
      command.dueDate !== undefined ? command.dueDate : task.dueDate,
      task.createdById,
      command.assignedToId !== undefined
        ? command.assignedToId
        : task.assignedToId,
      task.createdAt,
      new Date(),
    );

    await this.taskRepository.save(updatedTask);

    return updatedTask;
  }
}
