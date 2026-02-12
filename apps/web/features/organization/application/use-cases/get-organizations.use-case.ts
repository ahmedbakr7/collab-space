import { injectable, inject } from 'tsyringe';
import { Organization } from '@repo/domain';
import {
  ORGANIZATION_REPOSITORY_TOKEN,
  type OrganizationRepositoryPort,
} from '../ports/organization.repository.port';

@injectable()
export class GetOrganizationsUseCase {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly organizationRepository: OrganizationRepositoryPort,
  ) {}

  async execute(): Promise<Organization[]> {
    return this.organizationRepository.getOrganizations();
  }
}
