import { Workspace } from '@repo/domain';
import { WorkspaceRepository } from '../ports/workspace.repository.interface';

export class GetWorkspacesUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(filter?: { orgId?: string }): Promise<Workspace[]> {
    return this.workspaceRepository.findAll(filter);
  }
}
