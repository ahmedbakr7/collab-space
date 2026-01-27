import { Task, TaskStatus, TaskPriority } from '@repo/domain';
import { TaskRepository } from '../ports/task.repository.interface';
import { randomUUID } from 'crypto';

export interface CreateTaskCommand {
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdById: string;
  assignedToId?: string;
}

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    const now = new Date();

    const task = new Task(
      randomUUID(),
      command.projectId,
      command.title,
      command.description,
      command.status,
      command.priority,
      command.dueDate || null,
      command.createdById,
      command.assignedToId || null,
      now,
      now,
    );

    await this.taskRepository.save(task);

    return task;
  }
}
