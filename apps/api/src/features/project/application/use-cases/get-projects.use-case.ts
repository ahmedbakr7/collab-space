import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(workspaceId?: string): Promise<Project[]> {
    if (workspaceId) {
      return this.projectRepository.findByWorkspaceId(workspaceId);
    }
    return this.projectRepository.findAll();
  }
}
