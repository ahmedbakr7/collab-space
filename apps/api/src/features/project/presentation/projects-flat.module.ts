import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { ProjectsModule } from './projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [ProjectsController],
})
export class ProjectsFlatModule {}
