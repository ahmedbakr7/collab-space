import { useUseCase } from '@/shared/hooks/use-use-case';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.usecase';
import { CreateTaskDTO } from '@repo/domain';
import { Task } from '@repo/domain/src/task/entities/task.entity';

export const useCreateTask = () => {
  const { execute, loading, error } = useUseCase<CreateTaskDTO, Task>(
    CreateTaskUseCase
  );

  const createTask = async (data: CreateTaskDTO): Promise<Task | null> => {
    return execute(data);
  };

  return {
    createTask,
    isLoading: loading,
    error: error ? error.message : null
  };
};
