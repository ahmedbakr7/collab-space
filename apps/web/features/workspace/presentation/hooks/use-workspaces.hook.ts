import { useState, useEffect } from 'react';
import { GetAllWorkspacesUseCase } from '../../application/use-cases/get-all-workspaces.usecase';
import { InMemoryWorkspaceRepository } from '../../infrastructure/repositories/in-memory-workspace.repository';
import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export function useWorkspaces() {
  const [workspaces, setWorkspaces] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const repository = new InMemoryWorkspaceRepository();
    const useCase = new GetAllWorkspacesUseCase(repository);

    async function fetchWorkspaces() {
      try {
        const data = await useCase.execute();
        setWorkspaces(data);
      } catch (error) {
        console.error('Failed to fetch workspaces', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspaces();
  }, []);

  return { workspaces, loading };
}
