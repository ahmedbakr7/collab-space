import { Project } from '@repo/domain';

export interface ProjectRepository {
  save(project: Project): Promise<void>;
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  findByOrgId(orgId: string): Promise<Project[]>;
  findBySlug(orgId: string, slug: string): Promise<Project | null>;
  delete(id: string): Promise<void>;
}
