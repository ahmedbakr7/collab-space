import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export interface DashboardStats {
  totalProjects: { value: string; change: string };
  activeTasks: { value: string; change: string };
  teamMembers: { value: string; change: string };
  completionRate: { value: string; change: string };
}

// Extending Organization to include dashboard specific stats if needed, or just use Organization
// The mock data has specific fields like 'projects' (count), 'tasksCompleted'.
// Let's define a DTO for the Dashboard View of a Workspace.
export interface DashboardWorkspace extends Organization {
  color: string;
  membersCount: number;
  projectsCount: number;
  tasksCompleted: number;
  totalTasks: number;
  memberAvatars: string[];
}

export interface DashboardRepositoryPort {
  getDashboardData(): Promise<DashboardData>;
  getWorkspaces(): Promise<DashboardWorkspace[]>;
}
