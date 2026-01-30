import { injectable, inject } from 'tsyringe';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import type { WorkspaceRepositoryPort } from '../ports/workspace.repository.port';
import { CreateWorkspaceDTO } from '../dto/create-workspace.dto';
import { TYPES } from '@/shared/layers/di/types';

@injectable()
export class CreateWorkspaceUseCase {
  constructor(
    @inject(TYPES.IWorkspaceRepository)
    private readonly workspaceRepository: WorkspaceRepositoryPort,
  ) {}

  async execute(data: CreateWorkspaceDTO): Promise<Workspace> {
    return this.workspaceRepository.createWorkspace(data);
  }
}
