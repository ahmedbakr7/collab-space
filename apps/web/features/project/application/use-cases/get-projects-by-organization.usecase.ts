import { injectable, inject } from 'tsyringe';
import { TYPES } from '../../../../shared/layers/di/types';
import type { ProjectRepositoryPort } from '../ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

@injectable()
export class GetProjectsByOrganizationUseCase {
  constructor(
    @inject(TYPES.IProjectRepository)
    private readonly repository: ProjectRepositoryPort,
  ) {}

  async execute(organizationId: string, query?: QueryOptions): Promise<PaginatedResult<Project>> {
    return this.repository.getProjectsByOrganization(organizationId, query);
  }
}
