import { injectable, inject } from 'tsyringe';
import type { WorkspaceRepositoryPort } from '../ports/workspace.repository.port';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { TYPES } from '@/shared/layers/di/types';

export interface GetAllWorkspacesInput {
  orgId: string;
  query?: QueryOptions;
}

@injectable()
export class GetAllWorkspacesUseCase {
  constructor(
    @inject(TYPES.IWorkspaceRepository)
    private readonly repository: WorkspaceRepositoryPort,
  ) {}

  async execute(
    input: GetAllWorkspacesInput,
  ): Promise<PaginatedResult<Workspace>> {
    return this.repository.getAllWorkspaces(input.orgId, input.query);
  }
}
