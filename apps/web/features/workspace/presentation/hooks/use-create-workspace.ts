import { useState } from 'react';
import { CreateWorkspaceUseCase } from '../../application/use-cases/create-workspace.usecase';
import { clientContainer } from '@/infrastructure/di/client.container';
import { CreateWorkspaceDTO } from '../../application/dto/create-workspace.dto';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';

export const useCreateWorkspace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWorkspace = async (
    data: CreateWorkspaceDTO,
  ): Promise<Workspace | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const useCase = clientContainer.resolve(CreateWorkspaceUseCase);
      const workspace = await useCase.execute(data);
      return workspace;
    } catch (err: any) {
      setError(err.message || 'Failed to create workspace');
      // Re-throw to let component handle success/toast if needed, or handle here
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createWorkspace, isLoading, error };
};
