'use client';

import { useState } from 'react';
import { CreateOrgValues } from '@repo/shared-schemas';
import { clientContainer } from '@/shared/layers/di/client.container';
import { CreateOrganizationUseCase } from '../../application/use-cases/create-organization.use-case';
import { toast } from 'sonner';

export function useCreateOrganization() {
  const [isLoading, setIsLoading] = useState(false);

  const createOrganization = async (data: CreateOrgValues) => {
    setIsLoading(true);
    const useCase = clientContainer.resolve(CreateOrganizationUseCase);

    const promise = useCase.execute(data);

    toast.promise(promise, {
      loading: 'Creating organization...',
      success: (org) => `Organization "${org.name}" created successfully!`,
      error: (error: Error) => error.message || 'Failed to create organization',
    });

    try {
      return await promise;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrganization, isLoading };
}
