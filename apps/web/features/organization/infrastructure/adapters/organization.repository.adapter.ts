import { injectable, inject } from 'tsyringe';
import {
  Organization,
  type QueryOptions,
  type PaginatedResult,
} from '@repo/domain';
import { CreateOrgValues } from '@repo/shared-schemas';
import { OrganizationRepositoryPort } from '../../application/ports/organization.repository.port';
import {
  API_CLIENT_TOKEN,
  type ApiClientPort,
} from '@/features/shared/application/ports/api-client.port';
import { buildQueryParams } from '@/features/shared/infrastructure/query-params.builder';

@injectable()
export class OrganizationRepositoryAdapter implements OrganizationRepositoryPort {
  constructor(
    @inject(API_CLIENT_TOKEN) private readonly apiClient: ApiClientPort,
  ) {}

  async create(data: CreateOrgValues): Promise<{ id: string; name: string }> {
    return this.apiClient.post<{ id: string; name: string }>(
      '/organizations',
      data,
    );
  }

  async join(inviteCode: string): Promise<{ id: string; name: string }> {
    return this.apiClient.post<{ id: string; name: string }>(
      '/organizations/join',
      {
        inviteCode,
      },
    );
  }

  async getOrganizations(
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>> {
    return this.apiClient.get<PaginatedResult<Organization>>('/organizations', {
      params: buildQueryParams(query),
    });
  }

  async getPublicOrganizations(
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>> {
    return this.apiClient.get<PaginatedResult<Organization>>(
      '/organizations/public',
      {
        params: buildQueryParams(query),
      },
    );
  }

  async joinPublicOrganization(organizationId: string): Promise<void> {
    return this.apiClient.post<void>(
      `/organizations/${organizationId}/join`,
      {},
    );
  }
}
