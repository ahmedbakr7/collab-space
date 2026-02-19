import { injectable } from 'tsyringe';
import { ProjectRepositoryPort } from '../../application/ports/project.repository.port';
import {
  Project,
  ProjectStatus,
} from '@repo/domain/src/project/entities/project.entity';
import { apiClient } from '@/features/shared/infrastructure/api-client';

@injectable()
export class ProjectRepositoryAdapter implements ProjectRepositoryPort {
  async getProjectsByWorkspace(workspaceId: string): Promise<Project[]> {
    const projects = await apiClient.get<Project[]>(
      `/workspaces/${workspaceId}/projects`,
    );
    return projects.map(this.mapToEntity);
  }

  async getProject(id: string): Promise<Project | null> {
    try {
      const project = await apiClient.get<Project>(`/projects/${id}`);
      return this.mapToEntity(project);
    } catch (error) {
      return null;
    }
  }

  private mapToEntity(data: any): Project {
    return new Project(
      data.id,
      data.workspaceId,
      data.name,
      data.description,
      (data.status as ProjectStatus) || 'active',
      new Date(data.createdAt),
      new Date(data.updatedAt),
    );
  }
}
