import {
  DashboardRepositoryPort,
  DashboardWorkspace,
} from '../ports/dashboard.repository.port';

export class GetDashboardWorkspacesUseCase {
  constructor(private readonly repository: DashboardRepositoryPort) {}

  async execute(): Promise<DashboardWorkspace[]> {
    return this.repository.getWorkspaces();
  }
}
