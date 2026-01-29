import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';
import { WorkspacesModule } from './features/workspace/presentation/workspaces.module';
import { ProjectsModule } from './features/project/presentation/projects.module';
import { WorkspacesFlatModule } from './features/workspace/presentation/workspaces-flat.module';
import { ProjectsFlatModule } from './features/project/presentation/projects-flat.module';
import { TasksFlatModule } from './features/task/presentation/tasks-flat.module';
import { TagsModule } from './features/tag/presentation/tags.module';
import { TasksModule } from './features/task/presentation/tasks.module';
import { StorageModule } from './infrastructure/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    // Router Configuration
    RouterModule.register([
      {
        path: 'organizations',
        module: OrganizationsModule,
        children: [
          {
            path: ':orgId/workspaces',
            module: WorkspacesModule,
          },
          {
            path: ':orgId/tags',
            module: TagsModule,
          },
        ],
      },
      {
        path: 'workspaces',
        module: WorkspacesFlatModule,
        children: [
          {
            path: ':workspaceId/projects',
            module: ProjectsModule,
          },
        ],
      },
      {
        path: 'projects',
        module: ProjectsFlatModule,
        children: [
          {
            path: ':projectId/tasks',
            module: TasksModule,
          },
        ],
      },
      {
        path: 'tasks',
        module: TasksFlatModule,
      },
    ]),
    OrganizationsModule,
    WorkspacesModule,
    WorkspacesFlatModule,

    ProjectsModule,
    ProjectsFlatModule,

    TagsModule,
    TasksModule,
    TasksFlatModule,

    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
