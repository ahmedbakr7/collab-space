import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export interface DashboardStatItem {
  value: string | number;
  change: string;
}

export interface DashboardStats {
  totalProjects: DashboardStatItem;
  activeTasks: DashboardStatItem;
  teamMembers: DashboardStatItem;
  completionRate: DashboardStatItem;
}

export interface DashboardWorkspace extends Organization {
  membersCount: number;
  projectsCount: number;
  tasksCompleted: number;
  memberAvatars: string[];
}

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  time: string;
}

export interface UpcomingDeadlineItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

export interface DashboardData {
  stats: DashboardStats;
  workspaces: DashboardWorkspace[];
  recentActivity: ActivityItem[];
  upcomingDeadlines: UpcomingDeadlineItem[];
}
