'use client';

import { useState } from 'react';
import { JoinOrgValues } from '@repo/shared-schemas';
import { clientContainer } from '@/infrastructure/di/client.container';
import { JoinOrganizationUseCase } from '../../application/use-cases/join-organization.use-case';
import { toast } from 'sonner';

export function useJoinOrganization() {
  const [isLoading, setIsLoading] = useState(false);

  const joinOrganization = async (data: JoinOrgValues) => {
    setIsLoading(true);
    const useCase = clientContainer.resolve(JoinOrganizationUseCase);

    const promise = useCase.execute(data);

    toast.promise(promise, {
      loading: 'Joining organization...',
      success: (org) => `Successfully joined "${org.name}"!`,
      error: (error: Error) => error.message || 'Failed to join organization',
    });

    try {
      return await promise;
    } finally {
      setIsLoading(false);
    }
  };

  return { joinOrganization, isLoading };
}
