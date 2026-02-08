import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectNotFoundError } from '../errors/project.errors';

export class GetProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string, userId?: string): Promise<Project> {
    const project = await this.projectRepository.findById(id, { userId });

    if (!project) {
      throw new ProjectNotFoundError(id);
    }

    return project;
  }
}
