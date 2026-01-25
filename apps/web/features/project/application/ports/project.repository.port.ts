import { Project } from '@repo/domain/src/project/entities/project.entity';

export interface ProjectRepositoryPort {
  getAllProjects(): Promise<Project[]>;
  getProjectsByWorkspace(workspaceId: string): Promise<Project[]>;
  getProject(id: string): Promise<Project | null>;
}
