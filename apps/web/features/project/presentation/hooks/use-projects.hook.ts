import { useState, useEffect } from 'react';
import { GetProjectsByWorkspaceUseCase } from '../../application/use-cases/get-projects-by-workspace.usecase';
import { InMemoryProjectRepository } from '../../infrastructure/repositories/in-memory-project.repository';
import { Project } from '@repo/domain/src/project/entities/project.entity';

export function useProjects(workspaceId: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId) return;
    const repository = new InMemoryProjectRepository();
    const useCase = new GetProjectsByWorkspaceUseCase(repository);

    async function fetchProjects() {
      try {
        const data = await useCase.execute(workspaceId);
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [workspaceId]);

  return { projects, loading };
}
