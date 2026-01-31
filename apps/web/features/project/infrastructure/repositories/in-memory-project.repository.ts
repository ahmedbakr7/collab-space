import 'reflect-metadata';
import { injectable } from 'tsyringe';
import { ProjectRepositoryPort } from '../../application/ports/project.repository.port';
import { Project } from '@repo/domain/src/project/entities/project.entity';
import { MOCK_PROJECTS } from '@/features/shared/data/mock-data';

@injectable()
export class InMemoryProjectRepository implements ProjectRepositoryPort {
  async getAllProjects(): Promise<Project[]> {
    return MOCK_PROJECTS;
  }

  async getProjectsByWorkspace(workspaceId: string): Promise<Project[]> {
    return MOCK_PROJECTS.filter((p) => p.workspaceId === workspaceId);
  }

  async getProject(id: string): Promise<Project | null> {
    return MOCK_PROJECTS.find((p) => p.id === id) || null;
  }
}
