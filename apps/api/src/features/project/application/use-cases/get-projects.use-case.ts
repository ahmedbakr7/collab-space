import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Project } from '@repo/domain';
import { ProjectRepository } from '../ports/project.repository.interface';

export class GetProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(
    filter?: { workspaceId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Project>> {
    return this.projectRepository.findAll(filter, query);
  }
}
