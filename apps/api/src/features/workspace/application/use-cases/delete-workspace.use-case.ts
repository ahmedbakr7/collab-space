import { WorkspaceRepository } from '../ports/workspace.repository.interface';
import { WorkspaceNotFoundError } from '../errors/workspace.errors';

export class DeleteWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(id: string): Promise<void> {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw new WorkspaceNotFoundError(id);
    }

    await this.workspaceRepository.delete(id);
  }
}
