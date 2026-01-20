import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';
import { ProjectsModule } from './features/project/presentation/projects.module';
import { TagsModule } from './features/tag/presentation/tags.module';
import { TasksModule } from './features/task/presentation/tasks.module';

@Module({
  imports: [
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TagsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
