import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '@repo/domain';
import { CurrentUser } from '../../../../features/auth/presentation/decorators/current-user.decorator';
import { CheckPolicy } from '../../../../features/auth/presentation/decorators/check-policy.decorator';
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { PolicyGuard } from '../../../../features/auth/presentation/guards/policy.guard';
import { ResourceType } from '../../../../features/auth/presentation/guards/resource-type.enum';
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

const projectIdParamSchema = z.string().uuid();

@Controller()
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.PROJECT, 'projectId')
  async create(
    @Param('projectId', new ZodValidationPipe(projectIdParamSchema))
    projectId: string,
    @Body(new ZodValidationPipe(createTaskSchema)) body: CreateTaskDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.createTaskUseCase.execute({
      ...body,
      projectId,
      createdById: user.id,
      dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
    });
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.PROJECT, 'projectId')
  async getAll(
    @Param('projectId', new ZodValidationPipe(projectIdParamSchema.optional()))
    projectId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getTasksUseCase.execute({ projectId, userId: user.id });
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.TASK, 'id')
  async get(
    @Param('id', new ZodValidationPipe(taskIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getTaskUseCase.execute(id, user.id);
  }

  @Put(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.TASK, 'id')
  async update(
    @Param('id', new ZodValidationPipe(taskIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateTaskSchema)) body: UpdateTaskDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.updateTaskUseCase.execute(
      {
        id,
        ...body,
        dueDate:
          body.dueDate === null
            ? null
            : body.dueDate
              ? new Date(body.dueDate)
              : undefined,
      },
      user.id,
    );
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.TASK, 'id')
  async delete(
    @Param('id', new ZodValidationPipe(taskIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.deleteTaskUseCase.execute(id, user.id);
  }
}
