import { useState, useEffect } from 'react';
import { GetDashboardDataUseCase } from '../../application/use-cases/get-dashboard-data.usecase';
import { InMemoryDashboardRepository } from '../../infrastructure/repositories/in-memory-dashboard.repository';
import { DashboardData } from '../../domain/models/dashboard-data';

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repository = new InMemoryDashboardRepository();
    const useCase = new GetDashboardDataUseCase(repository);

    async function fetchData() {
      try {
        const result = await useCase.execute();
        setData(result);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading };
}
