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
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { CreateProjectUseCase } from '../../application/use-cases/create-project.use-case';
import { GetProjectUseCase } from '../../application/use-cases/get-project.use-case';
import { GetProjectsUseCase } from '../../application/use-cases/get-projects.use-case';
import { UpdateProjectUseCase } from '../../application/use-cases/update-project.use-case';
import { DeleteProjectUseCase } from '../../application/use-cases/delete-project.use-case';
import {
  CreateProjectDto,
  createProjectSchema,
} from '../dtos/create-project.dto';
import {
  UpdateProjectDto,
  updateProjectSchema,
} from '../dtos/update-project.dto';
import { projectIdSchema } from '../dtos/project-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';
import { z } from 'zod';

const workspaceIdParamSchema = z.string().uuid();
@Controller()
export class ProjectsController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly getProjectsUseCase: GetProjectsUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(
    @Body(new ZodValidationPipe(createProjectSchema)) body: CreateProjectDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.createProjectUseCase.execute(body);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async getAll(
    @Param(
      'workspaceId',
      new ZodValidationPipe(workspaceIdParamSchema.optional()),
    )
    workspaceId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getProjectsUseCase.execute({ workspaceId, userId: user.id });
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard)
  async get(
    @Param('id', new ZodValidationPipe(projectIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getProjectUseCase.execute(id, user.id);
  }

  @Put(':id')
  @UseGuards(SupabaseAuthGuard)
  async update(
    @Param('id', new ZodValidationPipe(projectIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateProjectSchema)) body: UpdateProjectDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.updateProjectUseCase.execute({ id, ...body }, user.id);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  async delete(
    @Param('id', new ZodValidationPipe(projectIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.deleteProjectUseCase.execute(id, user.id);
  }
}
