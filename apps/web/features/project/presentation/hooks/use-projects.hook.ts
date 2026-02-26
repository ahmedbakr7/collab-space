import 'reflect-metadata';
import { useMemo } from 'react';
import { GetProjectsByWorkspaceUseCase } from '../../application/use-cases/get-projects-by-workspace.usecase';
import { ProjectUIMapper } from '../mappers/project-ui.mapper';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { QueryOptions } from '@repo/domain';

export function useProjects(workspaceId: string, query?: QueryOptions) {
  const {
    data,
    loading,
    execute: refetch,
  } = useUseCase(GetProjectsByWorkspaceUseCase, {
    initialInput: { workspaceId, query },
    skip: !workspaceId,
  });

  const projects = useMemo(
    () => (data?.data ? data.data.map(ProjectUIMapper.toUI) : []),
    [data],
  );

  return {
    projects,
    meta: data?.meta || null,
    loading,
    refetch,
  };
}
