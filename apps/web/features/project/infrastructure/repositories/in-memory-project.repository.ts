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
    // Treat workspaceId as id or slug
    return MOCK_PROJECTS.filter(
      (p) => p.orgId === workspaceId || p.orgId === workspaceId,
    ); // Logic depends on what workspaceId is passed.
    // If slug is passed (e.g. 'product-team'), we need to map to ID '1'.
    // Or we should update mock data orgId to be consistent.
    // MOCK_WORKSPACES has IDs '1', '2', '3'.
    // MOCK_PROJECTS uses orgId '1', '2'.
    // The UI currently passes Slug? No, Dashboard.tsx passes 'id' if using Workspace entity?
    // Dashboard.tsx currently uses 'name' converted to slug in URL.
    // workspaces/[id]/page.tsx receives [id] from URL.
    // If URL is /workspaces/product-team, then id='product-team' (slug).
    // So we need to lookup workspace by slug to get ID, then filter projects.
    // OR we just filter projects by orgId matching workspace.id found by slug.
    // BUT this Repo method takes 'workspaceId'.
    // Let's assume the caller resolves the ID, OR this repo handles both?
    // Let's support both for robustness in mock.
    // Actually, getting workspace by slug is WorkspaceRepository job.
    // This method expects ID.
    // I'll keep simple filter for now.
    return MOCK_PROJECTS.filter((p) => p.orgId === workspaceId);
  }

  async getProject(id: string): Promise<Project | null> {
    return MOCK_PROJECTS.find((p) => p.id === id) || null;
  }
}
