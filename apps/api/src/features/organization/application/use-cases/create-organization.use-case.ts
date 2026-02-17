import { Organization, Visibility } from '@repo/domain';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import { randomUUID } from 'crypto';

export interface CreateOrganizationCommand {
  name: string;
  description?: string;
  visibility: Visibility;
}

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(
    command: CreateOrganizationCommand,
    userId: string,
  ): Promise<Organization> {
    const now = new Date();

    const organization = new Organization(
      randomUUID(),
      command.name,
      command.description ?? '',
      command.visibility,
      [],
      now,
      now,
    );

    await this.organizationRepository.save(organization);
    await this.organizationRepository.addMember(organization.id, userId);

    return organization;
  }
}
