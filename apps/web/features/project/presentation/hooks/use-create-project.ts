import { useUseCase } from '@/shared/hooks/use-use-case';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.usecase';
import { CreateProjectDTO } from '@repo/domain';
import { Project } from '@repo/domain/src/project/entities/project.entity';

export const useCreateProject = () => {
  const { execute, loading, error } = useUseCase<CreateProjectDTO, Project>(
    CreateProjectUseCase
  );

  const createProject = async (
    data: CreateProjectDTO,
  ): Promise<Project | null> => {
    return execute(data);
  };

  return {
    createProject,
    isLoading: loading,
    error: error ? error.message : null
  };
};
