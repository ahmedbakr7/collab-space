import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';
import { WorkspacesModule } from './features/workspace/presentation/workspaces.module';
import { ProjectsModule } from './features/project/presentation/projects.module';
import { ProjectsOrgModule } from './features/project/presentation/projects-org.module';
import { WorkspacesFlatModule } from './features/workspace/presentation/workspaces-flat.module';
import { ProjectsFlatModule } from './features/project/presentation/projects-flat.module';
import { TasksFlatModule } from './features/task/presentation/tasks-flat.module';
import { TagsModule } from './features/tag/presentation/tags.module';
import { TasksModule } from './features/task/presentation/tasks.module';
import { TasksOrgModule } from './features/task/presentation/tasks-org.module';
import { StorageModule } from './infrastructure/storage/storage.module';

import { envSchema } from './env';
import { RequestLoggerMiddleware } from './shared/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
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
          {
            path: ':orgId/projects',
            module: ProjectsOrgModule,
          },
          {
            path: ':orgId/tasks',
            module: TasksOrgModule,
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
    ProjectsOrgModule,
    ProjectsFlatModule,

    TagsModule,
    TasksModule,
    TasksOrgModule,
    TasksFlatModule,

    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
