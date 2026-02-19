import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { DashboardRepositoryPort } from '../../application/ports/dashboard.repository.port';
import {
  DashboardData,
  DashboardWorkspace,
} from '../../domain/models/dashboard-data';
import {
  MOCK_WORKSPACES,
  MOCK_PROJECTS,
  MOCK_TASKS,
} from '@/features/shared/data/mock-data';
import { TaskStatus } from '@repo/domain/src/task/entities/task.entity';

@injectable()
export class InMemoryDashboardRepository implements DashboardRepositoryPort {
  async getDashboardData(dashboardId: string): Promise<DashboardData> {
    const workspaces = await this.getWorkspaces();

    // Filter data by dashboardId (treating it as workspaceId)
    const dashboardProjects = MOCK_PROJECTS.filter(
      (p) => p.workspaceId === dashboardId,
    );
    const projectIds = dashboardProjects.map((p) => p.id);
    const dashboardTasks = MOCK_TASKS.filter(
      (t) => t.projectId && projectIds.includes(t.projectId),
    );

    const totalTasks = dashboardTasks.length;
    const completedTasks = dashboardTasks.filter(
      (t) => t.status === TaskStatus.DONE,
    ).length;
    const completionRateVal =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      stats: {
        totalProjects: {
          value: dashboardProjects.length,
          change: '+12% from last month',
        },
        activeTasks: {
          value: dashboardTasks.filter(
            (t) => t.status === TaskStatus.IN_PROGRESS,
          ).length,
          change: '+8% from last week',
        },
        teamMembers: { value: 12, change: '+3 new this month' },
        completionRate: {
          value: `${completionRateVal}%`,
          change: '+5% from last month',
        },
      },
      workspaces,
      recentActivity: [
        {
          id: '1',
          user: {
            name: 'Sarah Anderson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          },
          action: 'completed task',
          target: 'Design System Update',
          time: '2 hours ago',
        },
        {
          id: '2',
          user: {
            name: 'Michael Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          },
          action: 'commented on',
          target: 'API Documentation',
          time: '4 hours ago',
        },
        {
          id: '3',
          user: {
            name: 'Emma Wilson',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
          },
          action: 'created project',
          target: 'Q4 Marketing Campaign',
          time: '5 hours ago',
        },
      ],
      upcomingDeadlines: [
        {
          id: '1',
          title: 'Q4 Roadmap Review',
          date: 'Tomorrow, 2:00 PM',
          type: 'meeting',
        },
        {
          id: '2',
          title: 'Frontend Migration',
          date: 'Oct 25, 2024',
          type: 'project',
        },
        {
          id: '3',
          title: 'Design Handoff',
          date: 'Oct 28, 2024',
          type: 'task',
        },
      ],
    };
  }

  async getWorkspaces(): Promise<DashboardWorkspace[]> {
    return MOCK_WORKSPACES.map((ws) => {
      const wsProjects = MOCK_PROJECTS.filter((p) => p.workspaceId === ws.id);

      const projectIds = wsProjects.map((p) => p.id);
      const wsTasks = MOCK_TASKS.filter(
        (t) => t.projectId && projectIds.includes(t.projectId),
      );

      return {
        ...ws,
        membersCount: ws.members.length,
        projectsCount: wsProjects.length,
        tasksCompleted: wsTasks.filter((t) => t.status === TaskStatus.DONE)
          .length,
        memberAvatars: ws.members.map(
          (id) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
        ),
      };
    });
  }
}
