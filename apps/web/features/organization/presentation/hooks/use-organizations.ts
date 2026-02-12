'use client';

import { useState, useEffect, useCallback } from 'react';
import { Organization } from '@repo/domain';
import { clientContainer } from '@/infrastructure/di/client.container';
import { GetOrganizationsUseCase } from '../../application/use-cases/get-organizations.use-case';
import { toast } from 'sonner';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const useCase = clientContainer.resolve(GetOrganizationsUseCase);
      const data = await useCase.execute();
      setOrganizations(data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Failed to fetch organizations');
      setError(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return { organizations, isLoading, error, refetch: fetchOrganizations };
}
