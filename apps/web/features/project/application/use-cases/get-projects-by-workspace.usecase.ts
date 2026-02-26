import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { ProjectRepositoryPort } from '../ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface GetProjectsInput {
  workspaceId: string;
  query?: QueryOptions;
}

@injectable()
export class GetProjectsByWorkspaceUseCase {
  constructor(
    @inject(TYPES.IProjectRepository)
    private readonly repository: ProjectRepositoryPort,
  ) {}

  async execute(input: GetProjectsInput): Promise<PaginatedResult<Project>> {
    return this.repository.getProjectsByWorkspace(
      input.workspaceId,
      input.query,
    );
  }
}
