import { injectable } from 'tsyringe';
import {
  TaskRepositoryPort,
  TaskFilter,
} from '../../application/ports/task.repository.port';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import { apiClient } from '@/features/shared/infrastructure/api-client';

@injectable()
export class TaskRepositoryAdapter implements TaskRepositoryPort {
  async getTasks(filter?: TaskFilter): Promise<Task[]> {
    if (!filter?.projectId) {
      return [];
    }

    const tasks = await apiClient.get<Task[]>(
      `/projects/${filter.projectId}/tasks`,
    );
    return tasks.map(this.mapToEntity);
  }

  private mapToEntity(data: any): Task {
    return new Task(
      data.id,
      data.projectId,
      data.title,
      data.description,
      data.status,
      data.priority,
      data.dueDate ? new Date(data.dueDate) : null,
      data.createdById,
      data.assignedToId,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
