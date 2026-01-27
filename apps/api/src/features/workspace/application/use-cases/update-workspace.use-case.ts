import { Workspace } from '@repo/domain';
import { WorkspaceRepository } from '../ports/workspace.repository.interface';
import { UpdateWorkspaceDto } from '../dtos/update-workspace.dto';
import { WorkspaceNotFoundError } from '../errors/workspace.errors';

export class UpdateWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(
    command: UpdateWorkspaceDto & { id: string },
  ): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(command.id);

    if (!workspace) {
      throw new WorkspaceNotFoundError(command.id);
    }

    const updatedWorkspace = new Workspace(
      workspace.id,
      workspace.orgId,
      command.name ?? workspace.name,
      workspace.slug,
      command.description ?? workspace.description,
      workspace.createdAt,
      new Date(),
    );

    await this.workspaceRepository.save(updatedWorkspace);

    return updatedWorkspace;
  }
}
