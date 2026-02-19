import 'reflect-metadata';
import { GetAllWorkspacesUseCase } from '../../application/use-cases/get-all-workspaces.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useWorkspaces(orgId: string) {
  const { data, loading } = useUseCase(GetAllWorkspacesUseCase, {
    initialInput: orgId,
    skip: !orgId,
  });

  return { workspaces: data || [], loading };
}
