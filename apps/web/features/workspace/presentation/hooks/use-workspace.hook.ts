import 'reflect-metadata';
import { GetWorkspaceUseCase } from '../../application/use-cases/get-workspace.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useWorkspace(id: string) {
  const { data, loading } = useUseCase(GetWorkspaceUseCase, {
    initialInput: id,
    skip: !id,
  });

  return { workspace: data, loading };
}
