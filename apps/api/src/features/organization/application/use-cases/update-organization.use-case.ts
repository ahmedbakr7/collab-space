import { Organization, Visibility } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import { OrganizationNotFoundError } from '../errors/organization.errors';

export interface UpdateOrganizationCommand {
  id: string;
  name?: string;
  description?: string;
  visibility?: Visibility;
}

export class UpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(command: UpdateOrganizationCommand): Promise<Organization> {
    const organization = await this.organizationRepository.findById(command.id);

    if (!organization) {
      throw new OrganizationNotFoundError(command.id);
    }

    const updatedOrganization = new Organization(
      organization.id,
      command.name ?? organization.name,
      command.description ?? organization.description,
      command.visibility ?? organization.visibility,
      organization.members,
      organization.createdAt,
      new Date(),
    );

    await this.organizationRepository.save(updatedOrganization);

    return updatedOrganization;
  }
}
