import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectNotFoundError } from '../errors/project.errors';

export class DeleteProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(id: string): Promise<void> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new ProjectNotFoundError(id);
    }

    await this.projectRepository.delete(id);
  }
}
