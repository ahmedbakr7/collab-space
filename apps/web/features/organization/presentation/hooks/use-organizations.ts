'use client';

import 'reflect-metadata';
import { useEffect } from 'react';
import { GetOrganizationsUseCase } from '../../application/use-cases/get-organizations.use-case';
import { toast } from 'sonner';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useOrganizations() {
  const {
    data: organizations,
    loading: isLoading,
    error,
    execute: refetch,
  } = useUseCase(GetOrganizationsUseCase, {
    initialInput: undefined, // executes immediately because input is void? No wait, my hook expects input if provided.
  });

  // Since generic type inference might struggle with void input, we might need to cast or just call execute manually.
  // Actually UseCase<void, Organization[]> means input is void.
  // My hook definition: execute(input: TInput).
  // If TInput is void, we pass undefined.

  useEffect(() => {
    refetch(undefined);
  }, [refetch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    organizations: organizations || [],
    isLoading,
    error,
    refetch,
  };
}
