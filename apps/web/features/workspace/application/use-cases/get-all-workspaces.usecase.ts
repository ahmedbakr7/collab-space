import { injectable, inject } from 'tsyringe';
import type { WorkspaceRepositoryPort } from '../ports/workspace.repository.port';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { TYPES } from '@/shared/layers/di/types';

@injectable()
export class GetAllWorkspacesUseCase {
  constructor(
    @inject(TYPES.IWorkspaceRepository)
    private readonly repository: WorkspaceRepositoryPort,
  ) {}

  async execute(orgId: string): Promise<Workspace[]> {
    return this.repository.getAllWorkspaces(orgId);
  }
}
