import {
  DashboardData,
  DashboardWorkspace,
} from '../../domain/models/dashboard-data';

export interface DashboardRepositoryPort {
  getDashboardData(dashboardId: string): Promise<DashboardData>;
  getWorkspaces(): Promise<DashboardWorkspace[]>;
}
