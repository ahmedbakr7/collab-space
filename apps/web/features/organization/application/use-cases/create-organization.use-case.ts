import { injectable, inject } from 'tsyringe';
import { CreateOrgValues } from '@repo/shared-schemas';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../ports/organization.repository.port';

// Inline port interface to bypass Turbopack module resolution issue
interface OrganizationRepositoryPort {
  create(
    data: CreateOrgValues,
  ): Promise<{ id: string; name: string; slug: string }>;
  join(inviteCode: string): Promise<{ id: string; name: string }>;
}

@injectable()
export class CreateOrganizationUseCase {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repository: OrganizationRepositoryPort,
  ) {}

  async execute(
    data: CreateOrgValues,
  ): Promise<{ id: string; name: string; slug: string }> {
    return this.repository.create(data);
  }
}
