import 'reflect-metadata';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { GetTasksInput } from '../../application/ports/task.repository.port';

export function useTasks(input?: GetTasksInput) {
  const { data, loading } = useUseCase(GetTasksUseCase, {
    initialInput: input,
  });

  return {
    tasks: data?.data || [],
    meta: data?.meta || null,
    loading,
  };
}
