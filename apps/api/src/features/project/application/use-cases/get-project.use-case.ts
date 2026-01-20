import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectNotFoundError } from '../errors/project.errors';

export class GetProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new ProjectNotFoundError(id);
    }

    return project;
  }
}
