import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../ports/project.repository.interface';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }
}
