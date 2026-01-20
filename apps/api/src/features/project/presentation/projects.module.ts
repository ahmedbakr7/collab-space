import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { CreateProjectUseCase } from '../application/use-cases/create-project.use-case';
import { GetProjectUseCase } from '../application/use-cases/get-project.use-case';
import { GetProjectsUseCase } from '../application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from '../application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from '../application/use-cases/delete-project.use-case';
import { PrismaProjectRepository } from '../infrastructure/persistence/prisma-project.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { ProjectRepository } from '../application/ports/project.repository.interface';

const ProjectRepositoryToken = 'ProjectRepository';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    {
      provide: ProjectRepositoryToken,
      useClass: PrismaProjectRepository,
    },
    {
      provide: CreateProjectUseCase,
      useFactory: (projectRepository: ProjectRepository) =>
        new CreateProjectUseCase(projectRepository),
      inject: [ProjectRepositoryToken],
    },
    {
      provide: GetProjectUseCase,
      useFactory: (projectRepository: ProjectRepository) =>
        new GetProjectUseCase(projectRepository),
      inject: [ProjectRepositoryToken],
    },
    {
      provide: GetProjectsUseCase,
      useFactory: (projectRepository: ProjectRepository) =>
        new GetProjectsUseCase(projectRepository),
      inject: [ProjectRepositoryToken],
    },
    {
      provide: UpdateProjectUseCase,
      useFactory: (projectRepository: ProjectRepository) =>
        new UpdateProjectUseCase(projectRepository),
      inject: [ProjectRepositoryToken],
    },
    {
      provide: DeleteProjectUseCase,
      useFactory: (projectRepository: ProjectRepository) =>
        new DeleteProjectUseCase(projectRepository),
      inject: [ProjectRepositoryToken],
    },
  ],
  exports: [],
})
export class ProjectsModule {}
