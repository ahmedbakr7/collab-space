import { Organization } from '@repo/domain';

export interface OrganizationRepository {
  save(organization: Organization): Promise<void>;
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  findAll(): Promise<Organization[]>;
  delete(id: string): Promise<void>;
}
