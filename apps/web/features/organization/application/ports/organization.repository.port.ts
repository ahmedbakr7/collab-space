import {
  Organization,
  type QueryOptions,
  type PaginatedResult,
} from '@repo/domain';
import { CreateOrgValues } from '@repo/shared-schemas';

export const ORGANIZATION_REPOSITORY_TOKEN = Symbol('OrganizationRepository');

export interface OrganizationRepositoryPort {
  create(data: CreateOrgValues): Promise<{ id: string; name: string }>;
  join(inviteCode: string): Promise<{ id: string; name: string }>;
  getOrganizations(
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>>;
  getPublicOrganizations(
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>>;
  joinPublicOrganization(organizationId: string): Promise<void>;
}
