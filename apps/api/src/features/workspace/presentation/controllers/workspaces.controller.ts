import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateWorkspaceUseCase } from '../../application/use-cases/create-workspace.use-case';
import { GetWorkspaceUseCase } from '../../application/use-cases/get-workspace.use-case';
import { GetWorkspacesUseCase } from '../../application/use-cases/get-workspaces.use-case';
import { UpdateWorkspaceUseCase } from '../../application/use-cases/update-workspace.use-case';
import { DeleteWorkspaceUseCase } from '../../application/use-cases/delete-workspace.use-case';
import {
  CreateWorkspaceDto,
  createWorkspaceSchema,
} from '../../application/dtos/create-workspace.dto';
import {
  UpdateWorkspaceDto,
  updateWorkspaceSchema,
} from '../../application/dtos/update-workspace.dto';
import { workspaceIdSchema } from '../../application/dtos/workspace-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';
import { z } from 'zod';

import { OrganizationExistsInterceptor } from '../../../../features/organization/presentation/interceptors/organization-exists.interceptor';

const orgIdSchema = z.string().uuid();

@Controller()
@UseInterceptors(OrganizationExistsInterceptor)
export class WorkspacesController {
  constructor(
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    private readonly getWorkspaceUseCase: GetWorkspaceUseCase,
    private readonly getWorkspacesUseCase: GetWorkspacesUseCase,
    private readonly updateWorkspaceUseCase: UpdateWorkspaceUseCase,
    private readonly deleteWorkspaceUseCase: DeleteWorkspaceUseCase,
  ) {}

  @Post()
  async create(
    @Param('orgId', new ZodValidationPipe(orgIdSchema)) orgId: string,
    @Body(new ZodValidationPipe(createWorkspaceSchema))
    body: CreateWorkspaceDto,
  ) {
    return this.createWorkspaceUseCase.execute({ ...body, orgId });
  }

  @Get()
  async getAll(
    @Param('orgId', new ZodValidationPipe(orgIdSchema.optional()))
    orgId: string,
  ) {
    return this.getWorkspacesUseCase.execute({ orgId });
  }

  @Get(':id')
  async get(@Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string) {
    return this.getWorkspaceUseCase.execute(id);
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateWorkspaceSchema))
    body: UpdateWorkspaceDto,
  ) {
    return this.updateWorkspaceUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
  ) {
    return this.deleteWorkspaceUseCase.execute(id);
  }
}
