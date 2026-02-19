import 'reflect-metadata';
import { GetDashboardDataUseCase } from '../../application/use-cases/get-dashboard-data.usecase';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useDashboard(dashboardId: string) {
  const { data, loading } = useUseCase(GetDashboardDataUseCase, {
    initialInput: dashboardId,
    skip: !dashboardId,
  });

  return { data, loading };
}
