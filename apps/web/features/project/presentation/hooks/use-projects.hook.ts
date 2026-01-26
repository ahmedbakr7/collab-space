import { useState, useEffect, useMemo } from 'react';
import { clientContainer } from '@/shared/layers/di/client.container';
import { TYPES } from '@/shared/layers/di/types';
import { GetProjectsByWorkspaceUseCase } from '../../application/use-cases/get-projects-by-workspace.usecase';
import { Project } from '@repo/domain/src/project/entities/project.entity';

export function useProjects(workspaceId: string) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Resolve Use Case from DI Container
  const useCase = useMemo(
    () => clientContainer.resolve(GetProjectsByWorkspaceUseCase),
    [],
  );

  useEffect(() => {
    if (!workspaceId) return;

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
  }, [workspaceId, useCase]);

  return { projects, loading };
}
