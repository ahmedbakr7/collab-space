import { useState, useEffect } from 'react';
import { GetWorkspaceUseCase } from '../../application/use-cases/get-workspace.usecase';
import { InMemoryWorkspaceRepository } from '../../infrastructure/repositories/in-memory-workspace.repository';
import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export function useWorkspace(id: string) {
  const [workspace, setWorkspace] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const repository = new InMemoryWorkspaceRepository();
    const useCase = new GetWorkspaceUseCase(repository);

    async function fetchWorkspace() {
      try {
        const data = await useCase.execute(id);
        setWorkspace(data);
      } catch (error) {
        console.error('Failed to fetch workspace', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkspace();
  }, [id]);

  return { workspace, loading };
}
