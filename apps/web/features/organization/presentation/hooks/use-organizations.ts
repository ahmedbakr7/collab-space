'use client';

import 'reflect-metadata';
import { useEffect } from 'react';
import { GetOrganizationsUseCase } from '../../application/use-cases/get-organizations.use-case';
import { toast } from 'sonner';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import type { Organization } from '@repo/domain';

export function useOrganizations(query?: QueryOptions) {
  const {
    data: result,
    loading: isLoading,
    error,
    execute: refetch,
  } = useUseCase(GetOrganizationsUseCase, {
    initialInput: query,
  });

  useEffect(() => {
    refetch(query);
  }, [refetch, query]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return {
    organizations: result?.data || [],
    meta: result?.meta || null,
    isLoading,
    error,
    refetch,
  };
}
