import 'reflect-metadata';
import { GetAllWorkspacesUseCase } from '../../application/use-cases/get-all-workspaces.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { QueryOptions } from '@repo/domain';

export function useWorkspaces(orgId: string, query?: QueryOptions) {
  const { data, loading } = useUseCase(GetAllWorkspacesUseCase, {
    initialInput: { orgId, query },
    skip: !orgId,
  });

  return {
    workspaces: data?.data || [],
    meta: data?.meta || null,
    loading,
  };
}
