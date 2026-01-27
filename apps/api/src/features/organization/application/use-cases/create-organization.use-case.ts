import { Organization, Visibility } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import { OrganizationAlreadyExistsError } from '../errors/organization.errors';
import { randomUUID } from 'crypto';

export interface CreateOrganizationCommand {
  name: string;
  slug: string;
  description: string;
  visibility: Visibility;
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<Organization> {
    const existingOrganization = await this.organizationRepository.findBySlug(
      command.slug,
    );

    if (existingOrganization) {
      throw new OrganizationAlreadyExistsError(command.slug);
    }

    const now = new Date();

    const organization = new Organization(
      randomUUID(),
      command.name,
      command.slug,
      command.description,
      command.visibility,
      [],
      now,
      now,
    );

    await this.organizationRepository.save(organization);

    return organization;
  }
}
