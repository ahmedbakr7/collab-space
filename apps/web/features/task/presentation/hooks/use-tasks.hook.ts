import 'reflect-metadata';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { GetTasksInput } from '../../application/ports/task.repository.port';
import type { QueryOptions } from '@repo/domain';

export function useTasks(organizationId: string, query?: QueryOptions) {
  const input: GetTasksInput = {
    filter: { organizationId },
    query,
  };

  const { data, loading } = useUseCase(GetTasksUseCase, {
    initialInput: input,
    skip: !organizationId,
  });

  return {
    tasks: data?.data || [],
    meta: data?.meta || null,
    loading,
  };
}
