import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(filter?: {
    workspaceId?: string;
    userId?: string;
  }): Promise<Project[]> {
    return this.projectRepository.findAll(filter);
  }
}
