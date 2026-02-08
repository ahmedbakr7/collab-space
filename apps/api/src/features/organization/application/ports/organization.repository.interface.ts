import { Organization } from '@repo/domain';

export interface OrganizationRepository {
  save(organization: Organization): Promise<void>;
  findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Organization | null>;
  findAll(filter?: { userId?: string }): Promise<Organization[]>;
  delete(id: string): Promise<void>;
}
