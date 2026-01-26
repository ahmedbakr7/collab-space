import { clientContainer } from '@/shared/layers/di/client.container';
import { LogoutUseCase } from '../../application/use-cases/logout.use-case';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';
import { toast } from 'sonner';

export function useLogout() {
  const router = useRouter();
  const logoutUseCase = useMemo(
    () => clientContainer.resolve(LogoutUseCase),
    [],
  );

  return {
    logout: async () => {
      try {
        await logoutUseCase.execute();
        toast.success('Logged out successfully');
        router.push(ROUTES.AUTH.LOGIN);
      } catch (error: any) {
        console.error('Logout failed:', error);
        toast.error('Failed to logout');
      }
    },
  };
}
