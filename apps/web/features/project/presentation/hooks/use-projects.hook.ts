import 'reflect-metadata';
import { useMemo } from 'react';
import { GetProjectsByWorkspaceUseCase } from '../../application/use-cases/get-projects-by-workspace.usecase';
import { ProjectUIMapper } from '../mappers/project-ui.mapper';
import { useUseCase } from '@/shared/hooks/use-use-case';

export function useProjects(workspaceId: string) {
  const {
    data,
    loading,
    execute: refetch,
  } = useUseCase(GetProjectsByWorkspaceUseCase, {
    initialInput: workspaceId,
    skip: !workspaceId,
  });

  const projects = useMemo(
    () => (data ? data.map(ProjectUIMapper.toUI) : []),
    [data],
  );

  return { projects, loading, refetch };
}
