import { injectable } from 'tsyringe';
import { Organization } from '@repo/domain';
import { CreateOrgValues } from '@repo/shared-schemas';
import { OrganizationRepositoryPort } from '../../application/ports/organization.repository.port';
import { apiClient } from '@/features/shared/infrastructure/api-client';

@injectable()
export class OrganizationRepositoryAdapter implements OrganizationRepositoryPort {
  async create(data: CreateOrgValues): Promise<{ id: string; name: string }> {
    return apiClient.post<{ id: string; name: string }>('/organizations', data);
  }

  async join(inviteCode: string): Promise<{ id: string; name: string }> {
    return apiClient.post<{ id: string; name: string }>('/organizations/join', {
      inviteCode,
    });
  }

  async getOrganizations(): Promise<Organization[]> {
    return apiClient.get<Organization[]>('/organizations');
  }
}
