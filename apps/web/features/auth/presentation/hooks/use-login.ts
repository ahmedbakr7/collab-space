import { clientContainer } from '@/shared/layers/di/client.container';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { useMemo } from 'react';

export function useLogin() {
  const loginUseCase = useMemo(() => clientContainer.resolve(LoginUseCase), []);

  return {
    login: async (email: string, password: string) => {
      try {
        // await loginUseCase.execute({ email, password });
        return
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
  };
}
