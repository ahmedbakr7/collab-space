'use client';

import { useProjects } from '@/features/project/presentation/hooks/use-projects.hook';
import { useWorkspaces } from '@/features/workspace/presentation/hooks/use-workspaces.hook';
import { ProjectsView } from '@/features/project/presentation/components/projects-view';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface ProjectsPageProps {
  params: Promise<{ dashboardId: string }>;
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const { dashboardId } = use(params);
  const router = useRouter();

  const { workspaces, loading: workspacesLoading } = useWorkspaces(dashboardId);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');

  // Auto-select first workspace
  useEffect(() => {
    if (!selectedWorkspaceId && workspaces.length > 0) {
      const first = workspaces[0];
      if (first) setSelectedWorkspaceId(first.id);
    }
  }, [workspaces, selectedWorkspaceId]);

  const { projects, loading: projectsLoading } =
    useProjects(selectedWorkspaceId);

  return (
    <ProjectsView
      projects={projects}
      loading={workspacesLoading || projectsLoading}
      workspaces={workspaces}
      selectedWorkspaceId={selectedWorkspaceId}
      onWorkspaceChange={setSelectedWorkspaceId}
      onNavigate={(path) => router.push(path)}
    />
  );
}
