import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
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
  async create(
    @Body(new ZodValidationPipe(createProjectSchema)) body: CreateProjectDto,
  ) {
    return this.createProjectUseCase.execute(body);
  }

  @Get()
  async getAll(
    @Param('workspaceId', new ZodValidationPipe(workspaceIdParamSchema))
    workspaceId: string,
  ) {
    return this.getProjectsUseCase.execute(workspaceId);
  }

  @Get(':id')
  async get(@Param('id', new ZodValidationPipe(projectIdSchema)) id: string) {
    return this.getProjectUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(projectIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateProjectSchema)) body: UpdateProjectDto,
  ) {
    return this.updateProjectUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(projectIdSchema)) id: string,
  ) {
    return this.deleteProjectUseCase.execute(id);
  }
}
