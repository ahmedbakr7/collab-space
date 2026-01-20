import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './features/user/presentation/users.module';
import { OrganizationsModule } from './features/organization/presentation/organizations.module';
import { ProjectsModule } from './features/project/presentation/projects.module';

@Module({
  imports: [UsersModule, OrganizationsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
