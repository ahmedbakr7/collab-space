import { injectable, inject } from 'tsyringe';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import type { TaskRepositoryPort } from '../ports/task.repository.port';
import { CreateTaskDTO } from '@repo/domain';
import { TYPES } from '@/shared/layers/di/types';

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private readonly taskRepository: TaskRepositoryPort,
  ) {}

  async execute(data: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(data);
  }
}
