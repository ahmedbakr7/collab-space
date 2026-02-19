import { injectable, inject } from 'tsyringe';
import type { DashboardRepositoryPort } from '../ports/dashboard.repository.port';
import { DashboardData } from '../../domain/models/dashboard-data';
import { TYPES } from '@/shared/layers/di/types';

@injectable()
export class GetDashboardDataUseCase {
  constructor(
    @inject(TYPES.IDashboardRepository)
    private readonly repository: DashboardRepositoryPort,
  ) {}

  async execute(dashboardId: string): Promise<DashboardData> {
    return this.repository.getDashboardData(dashboardId);
  }
}
