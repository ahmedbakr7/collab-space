import { injectable, inject } from 'tsyringe';
import type {
  TaskRepositoryPort,
  TaskFilter,
} from '../ports/task.repository.port';
import { TYPES } from '../../../../shared/layers/di/types';
import { Task } from '@repo/domain/src/task/entities/task.entity';

@injectable()
export class GetTasksUseCase {
  constructor(
    @inject(TYPES.ITaskRepository)
    private readonly repository: TaskRepositoryPort,
  ) {}

  async execute(filter?: TaskFilter): Promise<Task[]> {
    return this.repository.getTasks(filter);
  }
}
