import { Organization, Visibility } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import {
  OrganizationNotFoundError,
  OrganizationAlreadyExistsError,
} from '../errors/organization.errors';

export interface UpdateOrganizationCommand {
  id: string;
  name?: string;
  slug?: string;
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

    if (command.slug && command.slug !== organization.slug) {
      const existingSlug = await this.organizationRepository.findBySlug(
        command.slug,
      );
      if (existingSlug) {
        throw new OrganizationAlreadyExistsError(command.slug);
      }
    }

    const updatedOrganization = new Organization(
      organization.id,
      command.name ?? organization.name,
      command.slug ?? organization.slug,
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
