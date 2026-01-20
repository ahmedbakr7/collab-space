import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../ports/project.repository.interface';
import {
  ProjectNotFoundError,
  ProjectAlreadyExistsError,
} from '../errors/project.errors';

export interface UpdateProjectCommand {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}

export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: UpdateProjectCommand): Promise<Project> {
    const project = await this.projectRepository.findById(command.id);

    if (!project) {
      throw new ProjectNotFoundError(command.id);
    }

    if (command.slug && command.slug !== project.slug) {
      const existingProject = await this.projectRepository.findBySlug(
        project.orgId,
        command.slug,
      );
      if (existingProject) {
        throw new ProjectAlreadyExistsError(command.slug);
      }
    }

    const updatedProject = new Project(
      project.id,
      project.orgId,
      command.name ?? project.name,
      command.description ?? project.description,
      command.slug ?? project.slug,
      project.createdAt,
      new Date(),
    );

    await this.projectRepository.save(updatedProject);

    return updatedProject;
  }
}
