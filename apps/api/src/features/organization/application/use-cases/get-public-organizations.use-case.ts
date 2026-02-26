import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Organization } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';

export class GetPublicOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(query?: QueryOptions): Promise<PaginatedResult<Organization>> {
    return this.organizationRepository.findPublic(query);
  }
}
