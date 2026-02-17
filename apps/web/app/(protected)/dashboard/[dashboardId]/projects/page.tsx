'use client';

import { useParams } from 'next/navigation';
import { Plus, FolderKanban } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { ROUTES } from '@/shared/config/routes';
import { useProjects } from '@/features/project/presentation/hooks/use-projects.hook';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import Link from 'next/link';
import { useDashboard } from '@/features/dashboard/presentation/hooks/use-dashboard.hook';

function WorkspaceProjects({
  workspace,
  dashboardId,
}: {
  workspace: { id: string; name: string };
  dashboardId: string;
}) {
  const { projects, loading } = useProjects(workspace.id);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-4">
        No projects in this workspace yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={ROUTES.DASHBOARD.PROJECTS.VIEW(dashboardId, project.id)}
        >
          <Card className="hover:shadow-lg transition-all cursor-pointer group h-full">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FolderKanban className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                    {project.name}
                  </h3>
                </div>
              </div>
              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
                <span>
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const params = useParams<{ dashboardId: string }>();
  const dashboardId = params.dashboardId;

  const { data, loading } = useDashboard(dashboardId);
  const workspaces = data?.workspaces;

  if (loading || !workspaces) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <Skeleton key={j} className="h-40 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Projects</h1>
          <p className="text-muted-foreground">
            All projects across your workspaces
          </p>
        </div>
        <Button
          nativeButton={false}
          render={
            <Link href={ROUTES.DASHBOARD.PROJECTS.CREATE(dashboardId)}>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Link>
          }
        ></Button>
      </div>

      {/* Projects grouped by workspace */}
      {workspaces.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg font-medium mb-1">No workspaces yet</p>
          <p className="text-sm">
            Create a workspace first, then add projects to it.
          </p>
        </div>
      ) : (
        workspaces.map((workspace) => (
          <div key={workspace.id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-blue-500 shrink-0" />
              <h2 className="text-lg font-semibold">{workspace.name}</h2>
              <Badge variant="secondary" className="text-xs">
                {workspace.projectsCount}{' '}
                {workspace.projectsCount === 1 ? 'project' : 'projects'}
              </Badge>
            </div>
            <WorkspaceProjects
              workspace={workspace}
              dashboardId={dashboardId}
            />
          </div>
        ))
      )}
    </div>
  );
}
