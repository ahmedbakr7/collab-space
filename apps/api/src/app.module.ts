import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';
import { ProjectsModule } from './features/project/presentation/projects.module';
import { TagsModule } from './features/tag/presentation/tags.module';
import { TasksModule } from './features/task/presentation/tasks.module';
import { StorageModule } from './infrastructure/storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    OrganizationsModule,

    ProjectsModule,
    TagsModule,
    TasksModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
