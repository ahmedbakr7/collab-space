import { injectable, inject } from 'tsyringe';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import type { ProjectRepositoryPort } from '../ports/project.repository.port';
import { CreateProjectDTO } from '@repo/domain';
import { TYPES } from '@/shared/layers/di/types';

@injectable()
export class CreateProjectUseCase {
  constructor(
    @inject(TYPES.IProjectRepository)
    private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  async execute(data: CreateProjectDTO): Promise<Project> {
    return this.projectRepository.createProject(data);
  }
}
