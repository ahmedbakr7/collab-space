import { clientContainer } from '@/shared/layers/di/client.container';
import { VerifySessionUseCase } from '../../application/use-cases/verify-session.use-case';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

export function useAuthGuard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const verifySessionUseCase = useMemo(
    () => clientContainer.resolve(VerifySessionUseCase),
    [],
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await verifySessionUseCase.execute();
        if (!user) {
          router.push(ROUTES.AUTH.LOGIN);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        router.push(ROUTES.AUTH.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, verifySessionUseCase]);

  return { isAuthenticated, isLoading };
}
