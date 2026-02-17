import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectNotFoundError } from '../errors/project.errors';

export interface UpdateProjectCommand {
  id: string;
  name?: string;
  description?: string;
}

export class UpdateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(
    command: UpdateProjectCommand,
    userId?: string,
  ): Promise<Project> {
    const project = await this.projectRepository.findById(
      command.id,
      userId ? { userId } : undefined,
    );

    if (!project) {
      throw new ProjectNotFoundError(command.id);
    }

    const updatedProject = new Project(
      project.id,
      project.workspaceId,
      command.name ?? project.name,
      command.description ?? project.description,
      project.createdAt,
      new Date(),
    );

    await this.projectRepository.save(updatedProject);

    return updatedProject;
  }
}
