import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Organization } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';

export class GetOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(
    userId?: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>> {
    return this.organizationRepository.findAll({ userId }, query);
  }
}
