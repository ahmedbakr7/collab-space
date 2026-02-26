import { injectable } from 'tsyringe';
import {
  TaskRepositoryPort,
  TaskFilter,
} from '../../application/ports/task.repository.port';
import { Task } from '@repo/domain/src/task/entities/task.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { apiClient } from '@/features/shared/infrastructure/api-client';
import { buildQueryParams } from '@/features/shared/infrastructure/query-params.builder';

@injectable()
export class TaskRepositoryAdapter implements TaskRepositoryPort {
  async getTasks(
    filter?: TaskFilter,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Task>> {
    let url: string;

    if (filter?.organizationId) {
      url = `/organizations/${filter.organizationId}/tasks`;
    } else if (filter?.projectId) {
      url = `/projects/${filter.projectId}/tasks`;
    } else {
      return {
        data: [],
        meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }

    const result = await apiClient.get<PaginatedResult<Task>>(url, {
      params: buildQueryParams(query),
    });
    return {
      data: result.data.map(this.mapToEntity),
      meta: result.meta,
    };
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
