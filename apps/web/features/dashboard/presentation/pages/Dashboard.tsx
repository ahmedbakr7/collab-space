'use client';

import {
  Plus,
  FolderKanban,
  CheckSquare,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { WorkspaceCard } from '@/features/dashboard/presentation/components/workspace-card';
import { RecentActivity } from '@/features/dashboard/presentation/components/recent-activity';
import { StatsCard } from '@/features/dashboard/presentation/components/stats-card';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes';

import { useDashboard } from '@/features/dashboard/presentation/hooks/use-dashboard.hook';

export default function Dashboard() {
  const router = useRouter();
  const { data, loading } = useDashboard();
  const { stats, workspaces } = data || {};

  if (loading || !data || !stats || !workspaces) {
    return <div className="p-8">Loading dashboard...</div>;
  }

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
          value={stats.totalProjects.value}
          change={stats.totalProjects.change}
          icon={FolderKanban}
          iconColor="bg-chart-1"
        />
        <StatsCard
          title="Active Tasks"
          value={stats.activeTasks.value}
          change={stats.activeTasks.change}
          icon={CheckSquare}
          iconColor="bg-chart-2"
        />
        <StatsCard
          title="Team Members"
          value={stats.teamMembers.value}
          change={stats.teamMembers.change}
          icon={Users}
          iconColor="bg-chart-3"
        />
        <StatsCard
          title="Completion Rate"
          value={stats.completionRate.value}
          change={stats.completionRate.change}
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
              members={workspace.membersCount}
              projects={workspace.projectsCount}
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
