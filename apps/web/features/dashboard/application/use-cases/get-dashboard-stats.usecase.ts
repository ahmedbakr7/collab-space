import {
  DashboardRepositoryPort,
  DashboardStats,
} from '../ports/dashboard.repository.port';

export class GetDashboardStatsUseCase {
  constructor(private readonly repository: DashboardRepositoryPort) {}

  async execute(): Promise<DashboardStats> {
    return this.repository.getStats();
  }
}
