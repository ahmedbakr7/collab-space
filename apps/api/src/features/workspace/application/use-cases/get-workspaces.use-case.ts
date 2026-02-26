import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Workspace } from '@repo/domain';
import { WorkspaceRepository } from '../ports/workspace.repository.interface';

export class GetWorkspacesUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(
    filter?: { orgId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Workspace>> {
    return this.workspaceRepository.findAll(filter, query);
  }
}
