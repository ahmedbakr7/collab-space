import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../ports/organization.repository.interface';
import { Visibility } from '@repo/domain';

export class JoinPublicOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
  ) {}

  async execute(organizationId: string, userId: string): Promise<void> {
    const organization =
      await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new Error('Organization not found');
    }

    if (organization.visibility !== Visibility.PUBLIC) {
      throw new Error('Cannot join private organization without invite');
    }

    await this.organizationRepository.addMember(organizationId, userId);
  }
}
