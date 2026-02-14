import { DashboardRepositoryPort } from '../ports/dashboard.repository.port';
import { DashboardData } from '../../domain/models/dashboard-data';

export class GetDashboardDataUseCase {
  constructor(private readonly repository: DashboardRepositoryPort) {}

  async execute(dashboardId: string): Promise<DashboardData> {
    return this.repository.getDashboardData(dashboardId);
  }
}
