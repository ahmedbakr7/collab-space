import { clientContainer } from '@/shared/layers/di/client.container';
import { SignupUseCase } from '../../application/use-cases/signup.use-case';
import { useMemo } from 'react';

export function useSignup() {
  const signupUseCase = useMemo(
    () => clientContainer.resolve(SignupUseCase),
    [],
  );

  return {
    signup: async (
      email: string,
      password: string,
      name: string,
      company?: string,
    ) => {
      try {
        await signupUseCase.execute({ email, password, name, company });
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      }
    },
  };
}
