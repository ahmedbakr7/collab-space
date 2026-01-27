import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.use-case';
import { GetTaskUseCase } from '../../application/use-cases/get-task.use-case';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/update-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.use-case';
import { CreateTaskDto, createTaskSchema } from '../dtos/create-task.dto';
import { UpdateTaskDto, updateTaskSchema } from '../dtos/update-task.dto';
import { taskIdSchema } from '../dtos/task-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';
import { z } from 'zod';

const projectIdQuerySchema = z.string().uuid();

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createTaskSchema)) body: CreateTaskDto,
  ) {
    return this.createTaskUseCase.execute({
      ...body,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    });
  }

  @Get()
  async getAll(
    @Query('projectId', new ZodValidationPipe(projectIdQuerySchema))
    projectId: string,
  ) {
    return this.getTasksUseCase.execute(projectId);
  }

  @Get(':id')
  async get(@Param('id', new ZodValidationPipe(taskIdSchema)) id: string) {
    return this.getTaskUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(taskIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateTaskSchema)) body: UpdateTaskDto,
  ) {
    return this.updateTaskUseCase.execute({
      id,
      ...body,
      dueDate:
        body.dueDate === null
          ? null
          : body.dueDate
            ? new Date(body.dueDate)
            : undefined,
    });
  }

  @Delete(':id')
  async delete(@Param('id', new ZodValidationPipe(taskIdSchema)) id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
