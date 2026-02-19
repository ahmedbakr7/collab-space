import {
  Project,
  ProjectStatus,
} from '@repo/domain/src/project/entities/project.entity';

export interface ProjectUI extends Omit<Project, 'status'> {
  status: ProjectStatus;
  progress: number;
  members: string[]; // Avatar URLs
  dueDate: string;
  completedTasks: number;
  totalTasks: number;
  workspaceColor: string;
}
