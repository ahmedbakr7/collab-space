import { injectable, inject } from 'tsyringe';
import { JoinOrgValues } from '@repo/shared-schemas';
import { ORGANIZATION_REPOSITORY_TOKEN } from '../ports/organization.repository.port';

// Inline port interface to bypass Turbopack module resolution issue
interface OrganizationRepositoryPort {
  create(data: any): Promise<{ id: string; name: string; slug: string }>;
  join(inviteCode: string): Promise<{ id: string; name: string }>;
}

@injectable()
export class JoinOrganizationUseCase {
  constructor(
    @inject(ORGANIZATION_REPOSITORY_TOKEN)
    private readonly repository: OrganizationRepositoryPort,
  ) {}

  async execute(data: JoinOrgValues): Promise<{ id: string; name: string }> {
    return this.repository.join(data.inviteCode);
  }
}
