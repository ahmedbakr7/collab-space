import { useState, useEffect, useCallback, useMemo } from 'react';
import { Organization } from '@repo/domain';
import { clientContainer } from '@/infrastructure/di/client.container';
import {
  ORGANIZATION_REPOSITORY_TOKEN,
  OrganizationRepositoryPort,
} from '../../application/ports/organization.repository.port';
import { toast } from 'sonner';

export function usePublicOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [joiningOrganizationId, setJoiningOrganizationId] = useState<string | null>(null);

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
      const data = await repository.getPublicOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error('Failed to fetch public organizations:', error);
      toast.error('Failed to load public organizations');
    } finally {
      setIsLoading(false);
    }
  }, [repository]);

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
    organizations,
    isLoading,
    joiningOrganizationId,
    joinOrganization,
    refresh: fetchOrganizations,
  };
}
