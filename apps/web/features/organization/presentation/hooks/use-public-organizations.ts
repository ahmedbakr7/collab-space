import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Organization,
  type QueryOptions,
  type PaginatedResult,
} from '@repo/domain';
import { clientContainer } from '@/shared/layers/di/client.container';
import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepositoryPort,
} from '../../application/ports/organization.repository.port';
import { toast } from 'sonner';

export function usePublicOrganizations(query?: QueryOptions) {
  const [result, setResult] = useState<PaginatedResult<Organization> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [joiningOrganizationId, setJoiningOrganizationId] = useState<
    string | null
  >(null);

  const repository = useMemo(
    () =>
      clientContainer.resolve<OrganizationRepositoryPort>(
        ORGANIZATION_REPOSITORY_TOKEN,
      ),
    [],
  );

  const fetchOrganizations = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await repository.getPublicOrganizations(query);
      setResult(data);
    } catch (error) {
      console.error('Failed to fetch public organizations:', error);
      toast.error('Failed to load public organizations');
    } finally {
      setIsLoading(false);
    }
  }, [repository, query]);

  const joinOrganization = async (organizationId: string) => {
    setJoiningOrganizationId(organizationId);
    try {
      await repository.joinPublicOrganization(organizationId);
      toast.success('Successfully joined organization');
    } catch (error) {
      console.error('Failed to join organization:', error);
      toast.error('Failed to join organization');
      throw error; // Re-throw so component knows it failed
    } finally {
      setJoiningOrganizationId(null);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations: result?.data || [],
    meta: result?.meta || null,
    isLoading,
    joiningOrganizationId,
    joinOrganization,
    refresh: fetchOrganizations,
  };
}
