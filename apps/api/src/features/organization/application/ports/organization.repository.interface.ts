import { Organization } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface OrganizationRepository {
  save(organization: Organization): Promise<void>;
  findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Organization | null>;
  findAll(
    filter?: { userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>>;
  findPublic(query?: QueryOptions): Promise<PaginatedResult<Organization>>;
  addMember(organizationId: string, userId: string): Promise<void>;
  delete(id: string): Promise<void>;
}
