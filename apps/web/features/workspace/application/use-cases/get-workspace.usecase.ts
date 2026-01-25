import { WorkspaceRepositoryPort } from '../ports/workspace.repository.port';
import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export class GetWorkspaceUseCase {
  constructor(private readonly repository: WorkspaceRepositoryPort) {}

  async execute(id: string): Promise<Organization | null> {
    return this.repository.getWorkspace(id);
  }
}
