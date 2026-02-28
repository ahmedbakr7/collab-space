import { DashboardRepositoryPort } from '../ports/dashboard.repository.port';
import { DashboardWorkspace } from '../../domain/models/dashboard-data';

export class GetDashboardWorkspacesUseCase {
  constructor(private readonly repository: DashboardRepositoryPort) {}

  async execute(): Promise<DashboardWorkspace[]> {
    return this.repository.getWorkspaces();
  }
}
