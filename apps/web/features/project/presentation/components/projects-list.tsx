import { ProjectUI } from '../models/project-ui.model';
import { ProjectCard } from './project-card';

interface ProjectsListProps {
  projects: ProjectUI[];
  viewMode: 'grid' | 'list';
  onNavigate: (path: string) => void;
}

export function ProjectsList({
  projects,
  viewMode,
  onNavigate,
}: ProjectsListProps) {
  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() =>
            onNavigate(
              `/dashboard/${project.workspaceId}/projects/${project.id}`,
            )
          }
        />
      ))}
    </div>
  );
}
