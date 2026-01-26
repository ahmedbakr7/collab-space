import { injectable } from 'tsyringe';
import { CreateOrgValues } from '@repo/shared-schemas';
import { OrganizationRepositoryPort } from '../../application/ports/organization.repository.port';

@injectable()
export class OrganizationRepositoryAdapter implements OrganizationRepositoryPort {
  async create(
    data: CreateOrgValues,
  ): Promise<{ id: string; name: string; slug: string }> {
    // TODO: Replace with actual API call
    const response = await fetch('/api/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'Failed to create organization' }));
      throw new Error(error.message || 'Failed to create organization');
    }

    return response.json();
  }

  async join(inviteCode: string): Promise<{ id: string; name: string }> {
    // TODO: Replace with actual API call
    const response = await fetch('/api/organizations/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode }),
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'Failed to join organization' }));
      throw new Error(error.message || 'Failed to join organization');
    }

    return response.json();
  }
}
