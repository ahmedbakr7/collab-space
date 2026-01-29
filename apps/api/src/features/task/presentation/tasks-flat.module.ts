import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksModule } from './tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [TasksController],
})
export class TasksFlatModule {}
