import { Module } from '@nestjs/common';
import { WorkspacesController } from './controllers/workspaces.controller';
import { CreateWorkspaceUseCase } from '../application/use-cases/create-workspace.use-case';
import { GetWorkspaceUseCase } from '../application/use-cases/get-workspace.use-case';
import { GetWorkspacesUseCase } from '../application/use-cases/get-workspaces.use-case';
import { UpdateWorkspaceUseCase } from '../application/use-cases/update-workspace.use-case';
import { DeleteWorkspaceUseCase } from '../application/use-cases/delete-workspace.use-case';
import { PrismaWorkspaceRepository } from '../infrastructure/persistence/prisma-workspace.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { WorkspaceRepository } from '../application/ports/workspace.repository.interface';

const WorkspaceRepositoryToken = 'WorkspaceRepository';

import { OrganizationsModule } from '../../organization/presentation/organizations.module';

@Module({
  imports: [OrganizationsModule],
  controllers: [WorkspacesController],
  providers: [
    PrismaService,
    {
      provide: WorkspaceRepositoryToken,
      useClass: PrismaWorkspaceRepository,
    },
    {
      provide: CreateWorkspaceUseCase,
      useFactory: (workspaceRepository: WorkspaceRepository) =>
        new CreateWorkspaceUseCase(workspaceRepository),
      inject: [WorkspaceRepositoryToken],
    },
    {
      provide: GetWorkspaceUseCase,
      useFactory: (workspaceRepository: WorkspaceRepository) =>
        new GetWorkspaceUseCase(workspaceRepository),
      inject: [WorkspaceRepositoryToken],
    },
    {
      provide: GetWorkspacesUseCase,
      useFactory: (workspaceRepository: WorkspaceRepository) =>
        new GetWorkspacesUseCase(workspaceRepository),
      inject: [WorkspaceRepositoryToken],
    },
    {
      provide: UpdateWorkspaceUseCase,
      useFactory: (workspaceRepository: WorkspaceRepository) =>
        new UpdateWorkspaceUseCase(workspaceRepository),
      inject: [WorkspaceRepositoryToken],
    },
    {
      provide: DeleteWorkspaceUseCase,
      useFactory: (workspaceRepository: WorkspaceRepository) =>
        new DeleteWorkspaceUseCase(workspaceRepository),
      inject: [WorkspaceRepositoryToken],
    },
  ],
  exports: [
    CreateWorkspaceUseCase,
    GetWorkspaceUseCase,
    GetWorkspacesUseCase,
    UpdateWorkspaceUseCase,
    DeleteWorkspaceUseCase,
  ],
})
export class WorkspacesModule {}
