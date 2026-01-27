import {
  DashboardData,
  DashboardWorkspace,
} from '../../domain/models/dashboard-data';

export interface DashboardRepositoryPort {
  getDashboardData(): Promise<DashboardData>;
  getWorkspaces(): Promise<DashboardWorkspace[]>;
}
