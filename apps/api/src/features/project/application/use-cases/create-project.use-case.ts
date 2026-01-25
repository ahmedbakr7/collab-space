import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';
import { ProjectAlreadyExistsError } from '../errors/project.errors';
import { randomUUID } from 'crypto';

export interface CreateProjectCommand {
  orgId: string;
  name: string;
  slug: string;
  description: string;
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    const existingProject = await this.projectRepository.findBySlug(
      command.orgId,
      command.slug,
    );

    if (existingProject) {
      throw new ProjectAlreadyExistsError(command.slug);
    }

    const now = new Date();

    const project = new Project(
      randomUUID(),
      command.orgId,
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
