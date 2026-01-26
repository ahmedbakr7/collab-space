import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { ProjectRepositoryPort } from '../ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';

@injectable()
export class GetProjectsByWorkspaceUseCase {
  constructor(
    @inject(TYPES.IProjectRepository)
    private readonly repository: ProjectRepositoryPort,
  ) {}

  async execute(workspaceId: string): Promise<Project[]> {
    return this.repository.getProjectsByWorkspace(workspaceId);
  }
}
