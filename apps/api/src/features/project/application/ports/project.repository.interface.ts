import { Project } from '@repo/domain';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string, filter?: { userId?: string }): Promise<Project | null>;
  findAll(filter?: {
    workspaceId?: string;
    userId?: string;
  }): Promise<Project[]>;
  findByWorkspaceId(workspaceId: string): Promise<Project[]>;
  delete(id: string): Promise<void>;
}
