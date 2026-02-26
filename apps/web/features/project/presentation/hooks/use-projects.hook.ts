import 'reflect-metadata';
import { useMemo } from 'react';
import { GetProjectsByOrganizationUseCase } from '../../application/use-cases/get-projects-by-organization.usecase';
import { ProjectUIMapper } from '../mappers/project-ui.mapper';
import { useUseCase } from '@/shared/hooks/use-use-case';
import type { QueryOptions } from '@repo/domain';

export function useProjects(organizationId: string, query?: QueryOptions) {
  const {
    data,
    loading,
    execute: refetch,
  } = useUseCase(GetProjectsByOrganizationUseCase, {
    initialInput: organizationId,
    skip: !organizationId,
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
