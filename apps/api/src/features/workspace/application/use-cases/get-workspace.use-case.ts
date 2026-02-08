import { Workspace } from '@repo/domain';
import { WorkspaceRepository } from '../ports/workspace.repository.interface';
import { WorkspaceNotFoundError } from '../errors/workspace.errors';

export class GetWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(id: string, userId?: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(id, { userId });

    if (!workspace) {
      throw new WorkspaceNotFoundError(id);
    }

    return workspace;
  }
}
