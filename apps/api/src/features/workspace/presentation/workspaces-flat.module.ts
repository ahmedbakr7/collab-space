import { Module } from '@nestjs/common';
import { WorkspacesController } from './controllers/workspaces.controller';
import { WorkspacesModule } from './workspaces.module';

import { OrganizationsModule } from '../../organization/presentation/organizations.module';

@Module({
  imports: [WorkspacesModule, OrganizationsModule],
  controllers: [WorkspacesController],
})
export class WorkspacesFlatModule {}
