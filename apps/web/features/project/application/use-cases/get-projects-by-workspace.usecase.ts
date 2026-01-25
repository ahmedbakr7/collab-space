import { ProjectRepositoryPort } from '../ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';

export class GetProjectsByWorkspaceUseCase {
  constructor(private readonly repository: ProjectRepositoryPort) {}

  async execute(workspaceId: string): Promise<Project[]> {
    return this.repository.getProjectsByWorkspace(workspaceId);
  }
}
