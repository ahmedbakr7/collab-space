import { Organization } from '../../domain/entities/organization.entity';
import { OrganizationRepository } from '../ports/organization.repository.interface';

export class GetOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }
}
