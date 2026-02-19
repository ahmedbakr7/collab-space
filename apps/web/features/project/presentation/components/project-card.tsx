import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { ProjectUI } from '../models/project-ui.model';

const statusConfig: Record<
  ProjectUI['status'],
  {
    label: string;
    variant: 'default' | 'secondary' | 'outline' | 'destructive';
  }
> = {
  active: { label: 'Active', variant: 'default' },
  planning: { label: 'Planning', variant: 'secondary' },
  review: { label: 'Review', variant: 'default' },
  completed: { label: 'Completed', variant: 'outline' },
};

interface ProjectCardProps {
  project: ProjectUI;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="group-hover:text-primary transition-colors line-clamp-1 font-semibold">
              {project.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Workspace Badge - Optional if strictly project view within workspace context, but keeps parity */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded ${project.workspaceColor}`} />
          {/* We might not need workspace name if we are inside a workspace, but keeping for now */}
        </div>

        {/* Status and Due Date */}
        <div className="flex items-center justify-between">
          <Badge
            variant={
              statusConfig[project.status]?.variant ||
              statusConfig.active.variant
            }
          >
            {statusConfig[project.status]?.label || project.status}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Due {project.dueDate}
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Tasks</span>
            <span>
              {project.completedTasks} / {project.totalTasks}
            </span>
          </div>
        </div>

        {/* Team Members */}
        <div className="pt-2 border-t border-border">
          <div className="flex -space-x-2">
            {project.members.slice(0, 4).map((avatar, idx) => (
              <Avatar key={idx} className="w-8 h-8 border-2 border-card">
                <AvatarImage src={avatar} />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-secondary border-2 border-card flex items-center justify-center">
                <span className="text-xs">+{project.members.length - 4}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
