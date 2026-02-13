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
  const [isJoining, setIsJoining] = useState<string | null>(null);

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
    setIsJoining(organizationId);
    try {
      await repository.joinPublicOrganization(organizationId);
      toast.success('Successfully joined organization');
      // Optionally refresh list or handle success (e.g. redirect)
      // For now, maybe just refresh or let the updated user state handle it?
      // User state update might need a separate mechanism or reload.
      window.location.href = '/'; // Simple redirect to dashboard to refresh user context
    } catch (error) {
      console.error('Failed to join organization:', error);
      toast.error('Failed to join organization');
    } finally {
      setIsJoining(null);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return {
    organizations,
    isLoading,
    isJoining,
    joinOrganization,
    refresh: fetchOrganizations,
  };
}
