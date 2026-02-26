'use client';

import { useProjects } from '@/features/project/presentation/hooks/use-projects.hook';
import { ProjectsView } from '@/features/project/presentation/components/projects-view';
import { useRouter } from 'next/navigation';
import { use } from 'react';

interface ProjectsPageProps {
  params: Promise<{ dashboardId: string }>;
}

export default function ProjectsPage({ params }: ProjectsPageProps) {
  const { dashboardId } = use(params);
  const router = useRouter();

  const { projects, loading } = useProjects(dashboardId);

  return (
    <ProjectsView
      projects={projects}
      loading={loading}
      onNavigate={(path) => router.push(path)}
    />
  );
}
