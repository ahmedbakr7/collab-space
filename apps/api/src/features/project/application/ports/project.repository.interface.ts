import { Project } from '@repo/domain';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  findByWorkspaceId(workspaceId: string): Promise<Project[]>;
  delete(id: string): Promise<void>;
}
