import { useMemo, useState, useCallback, useEffect } from 'react';
import { clientContainer } from '@/infrastructure/di/client.container';
import { InjectionToken } from 'tsyringe';

export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

interface UseUseCaseState<TOutput> {
  data: TOutput | null;
  loading: boolean;
  error: Error | null;
}

interface UseUseCaseOptions<TInput> {
  /**
   * If provided, the use case will be executed immediately with these inputs.
   * If omitted, you must call `execute` manually.
   */
  initialInput?: TInput;
  /**
   * If true, the use case will not execute automatically even if initialInput is provided.
   * Useful when execution depends on some condition.
   */
  skip?: boolean;
}

export function useUseCase<TInput, TOutput>(
  token: InjectionToken<UseCase<TInput, TOutput>>,
  options: UseUseCaseOptions<TInput> = {},
) {
  const [state, setState] = useState<UseUseCaseState<TOutput>>({
    data: null,
    loading: !options.skip && options.initialInput !== undefined,
    error: null,
  });

  const useCase = useMemo(() => {
    return clientContainer.resolve(token);
  }, [token]);

  const execute = useCallback(
    async (input: TInput) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const result = await useCase.execute(input);
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState((prev) => ({ ...prev, loading: false, error }));
        throw error;
      }
    },
    [useCase],
  );

  useEffect(() => {
    if (options.skip || options.initialInput === undefined) return;
    execute(options.initialInput).catch((e) => {
      console.error('Use case execution failed:', e);
    });
  }, [execute, options.initialInput, options.skip]);

  return {
    ...state,
    execute,
  };
}
