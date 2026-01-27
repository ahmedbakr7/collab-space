import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectAlreadyExistsError } from '../errors/project.errors';
import { randomUUID } from 'crypto';

export interface CreateProjectCommand {
  workspaceId: string;
  name: string;
  slug: string;
  description: string;
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    const existingProject = await this.projectRepository.findBySlug(
      command.workspaceId,
      command.slug,
    );

    if (existingProject) {
      throw new ProjectAlreadyExistsError(command.slug);
    }

    const now = new Date();

    const project = new Project(
      randomUUID(),
      command.workspaceId,
      command.name,
      command.description,
      command.slug,
      now,
      now,
    );

    await this.projectRepository.save(project);

    return project;
  }
}
