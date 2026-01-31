import { Workspace } from '@repo/domain';
import { WorkspaceRepository } from '../ports/workspace.repository.interface';
import { CreateWorkspaceDto } from '../dtos/create-workspace.dto';
import { randomUUID } from 'crypto';

export class CreateWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async execute(
    command: CreateWorkspaceDto & { orgId: string },
  ): Promise<Workspace> {
    const now = new Date();

    const workspace = new Workspace(
      randomUUID(),
      command.orgId,
      command.name,
      command.description ?? null,
      now,
      now,
    );

    await this.workspaceRepository.save(workspace);

    return workspace;
  }
}
