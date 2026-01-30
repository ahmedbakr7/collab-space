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
import { Skeleton } from '@/shared/components/ui/skeleton';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { data, loading } = useDashboard();
  const { stats, workspaces } = data || {};

  if (loading || !data || !stats || !workspaces) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-lg" />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
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
        <Button
          render={
            <Link href={ROUTES.WORKSPACES.CREATE}>
              <Plus className="w-4 h-4 mr-2" />
              New workspace
            </Link>
          }
        ></Button>
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
              color={''}
              totalTasks={0}
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
