import { Organization } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';

export class GetOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(userId?: string): Promise<Organization[]> {
    return this.organizationRepository.findAll({ userId });
  }
}
