import { WorkspaceRepositoryPort } from '../ports/workspace.repository.port';
import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export class GetAllWorkspacesUseCase {
  constructor(private readonly repository: WorkspaceRepositoryPort) {}

  async execute(): Promise<Organization[]> {
    return this.repository.getAllWorkspaces();
  }
}
