import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { CreateTaskUseCase } from '../application/use-cases/create-task.use-case';
import { GetTaskUseCase } from '../application/use-cases/get-task.use-case';
import { GetTasksUseCase } from '../application/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../application/use-cases/delete-task.use-case';
import { PrismaTaskRepository } from '../infrastructure/persistence/prisma-task.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { TaskRepository } from '../application/ports/task.repository.interface';

const TaskRepositoryToken = 'TaskRepository';

@Module({
  controllers: [TasksController],
  providers: [
    PrismaService,
    {
      provide: TaskRepositoryToken,
      useClass: PrismaTaskRepository,
    },
    {
      provide: CreateTaskUseCase,
      useFactory: (taskRepository: TaskRepository) =>
        new CreateTaskUseCase(taskRepository),
      inject: [TaskRepositoryToken],
    },
    {
      provide: GetTaskUseCase,
      useFactory: (taskRepository: TaskRepository) =>
        new GetTaskUseCase(taskRepository),
      inject: [TaskRepositoryToken],
    },
    {
      provide: GetTasksUseCase,
      useFactory: (taskRepository: TaskRepository) =>
        new GetTasksUseCase(taskRepository),
      inject: [TaskRepositoryToken],
    },
    {
      provide: UpdateTaskUseCase,
      useFactory: (taskRepository: TaskRepository) =>
        new UpdateTaskUseCase(taskRepository),
      inject: [TaskRepositoryToken],
    },
    {
      provide: DeleteTaskUseCase,
      useFactory: (taskRepository: TaskRepository) =>
        new DeleteTaskUseCase(taskRepository),
      inject: [TaskRepositoryToken],
    },
  ],
})
export class TasksModule {}
