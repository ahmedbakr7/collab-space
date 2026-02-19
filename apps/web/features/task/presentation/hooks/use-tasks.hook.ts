import 'reflect-metadata';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useTasks() {
  const { data, loading } = useUseCase(GetTasksUseCase, {
    initialInput: undefined,
  });

  return { tasks: data || [], loading };
}
