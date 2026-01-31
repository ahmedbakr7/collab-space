import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';
import { randomUUID } from 'crypto';

export interface CreateProjectCommand {
  workspaceId: string;
  name: string;
  description: string;
}

export class CreateProjectUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: CreateProjectCommand): Promise<Project> {
    const now = new Date();

    const project = new Project(
      randomUUID(),
      command.workspaceId,
      command.name,
      command.description,
      now,
      now,
    );

    await this.projectRepository.save(project);

    return project;
  }
}
