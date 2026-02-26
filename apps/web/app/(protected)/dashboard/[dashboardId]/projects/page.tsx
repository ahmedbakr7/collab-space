'use client';

import { useProjects } from '@/features/project/presentation/hooks/use-projects.hook';
import { useWorkspaces } from '@/features/workspace/presentation/hooks/use-workspaces.hook';
import { ProjectsView } from '@/features/project/presentation/components/projects-view';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface ProjectsPageProps {
  params: Promise<{ dashboardId: string }>;
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const { dashboardId } = use(params);
  const router = useRouter();

  const { workspaces, loading: workspacesLoading } = useWorkspaces(dashboardId);
  const { projects, loading: projectsLoading } = useProjects(dashboardId);

  return (
    <ProjectsView
      projects={projects}
      loading={workspacesLoading || projectsLoading}
      workspaces={workspaces}
      onNavigate={(path) => router.push(path)}
    />
  );
}
