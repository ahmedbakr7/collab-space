'use client';

import {
  Plus,
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { WorkspaceCard } from '@/features/dashboard/components/workspace-card';
import { RecentActivity } from '@/features/dashboard/components/recent-activity';
import { StatsCard } from '@/features/dashboard/components/stats-card';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

const workspaces = [
  {
    name: 'Product Team',
    description:
      'Product development and feature planning for our core platform',
    color: 'bg-chart-1',
    members: 12,
    projects: 8,
    tasksCompleted: 45,
    totalTasks: 68,
    memberAvatars: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    ],
  },
  {
    name: 'Marketing',
    description: 'Marketing campaigns, content strategy, and brand initiatives',
    color: 'bg-chart-2',
    members: 8,
    projects: 5,
    tasksCompleted: 32,
    totalTasks: 45,
    memberAvatars: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    ],
  },
  {
    name: 'Engineering',
    description:
      'Software development, infrastructure, and technical operations',
    color: 'bg-chart-3',
    members: 15,
    projects: 12,
    tasksCompleted: 78,
    totalTasks: 95,
    memberAvatars: [
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
      'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
    ],
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening with your projects today
          </p>
        </div>
        <Button onClick={() => router.push(ROUTES.WORKSPACES.NEW)}>
          <Plus className="w-4 h-4 mr-2" />
          New workspace
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Projects"
          value="25"
          change="+12% from last month"
          icon={FolderKanban}
          iconColor="bg-chart-1"
        />
        <StatsCard
          title="Active Tasks"
          value="208"
          change="+8% from last week"
          icon={CheckSquare}
          iconColor="bg-chart-2"
        />
        <StatsCard
          title="Team Members"
          value="35"
          change="+3 new this month"
          icon={Users}
          iconColor="bg-chart-3"
        />
        <StatsCard
          title="Completion Rate"
          value="73%"
          change="+5% from last month"
          icon={TrendingUp}
          iconColor="bg-chart-4"
        />
      </div>

      {/* Workspaces */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Workspaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.name}
              {...workspace}
              onClick={() =>
                router.push(
                  `/workspaces/${workspace.name.toLowerCase().replace(' ', '-')}`,
                )
              }
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <RecentActivity />
      </div>
    </div>
  );
}
