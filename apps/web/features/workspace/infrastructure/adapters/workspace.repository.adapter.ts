import { injectable, inject } from 'tsyringe';
import { WorkspaceRepositoryPort } from '../../application/ports/workspace.repository.port';
import { CreateWorkspaceDTO } from '../../application/dto/create-workspace.dto';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import {
  API_CLIENT_TOKEN,
  type ApiClientPort,
} from '@/features/shared/application/ports/api-client.port';
import { buildQueryParams } from '@/features/shared/infrastructure/query-params.builder';

@injectable()
export class WorkspaceRepositoryAdapter implements WorkspaceRepositoryPort {
  constructor(
    @inject(API_CLIENT_TOKEN) private readonly apiClient: ApiClientPort,
  ) {}

  async getAllWorkspaces(
    orgId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>> {
    const result = await this.apiClient.get<PaginatedResult<Workspace>>(
      `/organizations/${orgId}/workspaces`,
      { params: buildQueryParams(query) },
    );
    return {
      data: result.data.map(this.mapToEntity),
      meta: result.meta,
    };
  }

  async createWorkspace(data: CreateWorkspaceDTO): Promise<Workspace> {
    const workspace = await this.apiClient.post<Workspace>(
      `/organizations/${data.organizationId}/workspaces`,
      data,
    );
    return this.mapToEntity(workspace);
  }

  async getWorkspace(id: string): Promise<Workspace | null> {
    try {
      const workspace = await this.apiClient.get<Workspace>(
        `/workspaces/${id}`,
      );
      return this.mapToEntity(workspace);
    } catch (error) {
      return null;
    }
  }

  private mapToEntity(data: any): Workspace {
    return new Workspace(
      data.id,
      data.orgId,
      data.name,
      data.description,
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
