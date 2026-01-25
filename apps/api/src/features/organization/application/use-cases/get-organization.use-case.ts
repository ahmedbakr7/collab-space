import { Organization } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import { OrganizationNotFoundError } from '../errors/organization.errors';

export class GetOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new OrganizationNotFoundError(id);
    }

    return organization;
  }
}
