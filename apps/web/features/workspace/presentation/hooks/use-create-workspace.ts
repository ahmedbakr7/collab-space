import { useUseCase } from '@/shared/hooks/use-use-case';
import { CreateWorkspaceUseCase } from '../../application/use-cases/create-workspace.usecase';
import { CreateWorkspaceDTO } from '../../application/dto/create-workspace.dto';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';

export const useCreateWorkspace = () => {
  const { execute, loading, error } = useUseCase<CreateWorkspaceDTO, Workspace>(
    CreateWorkspaceUseCase
  );

  const createWorkspace = async (
    data: CreateWorkspaceDTO,
  ): Promise<Workspace | null> => {
    return execute(data);
  };

  return {
    createWorkspace,
    isLoading: loading,
    error: error ? error.message : null
  };
};
