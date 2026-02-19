import { Project } from '@repo/domain/src/project/entities/project.entity';
import { ProjectUI } from '../models/project-ui.model';

export class ProjectUIMapper {
  // todo: remove mock data generation
  static toUI(project: Project): ProjectUI {
    // Deterministic mock data generation based on project ID
    const mockProgress = Math.floor(Math.random() * 100);
    const mockTotalTasks = Math.floor(Math.random() * 20) + 5;
    const mockCompletedTasks = Math.floor(
      (mockProgress / 100) * mockTotalTasks,
    );

    // Mock members (using tough-luck-generated avatars or placeholders)
    const mockMembers = [
      'https://github.com/shadcn.png',
      'https://github.com/vercel.png',
    ];

    return {
      ...project,
      status: project.status,
      progress: mockProgress,
      members: mockMembers,
      dueDate: new Date(
        project.updatedAt.getTime() + 7 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString(), // Due 1 week from update
      completedTasks: mockCompletedTasks,
      totalTasks: mockTotalTasks,
      workspaceColor: 'bg-blue-500', // Default color
    };
  }
}
