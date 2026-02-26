import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthUser } from '@repo/domain';
import type { QueryOptions } from '@repo/domain';
import { CurrentUser } from '../../../../features/auth/presentation/decorators/current-user.decorator';
import { CheckPolicy } from '../../../../features/auth/presentation/decorators/check-policy.decorator';
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { PolicyGuard } from '../../../../features/auth/presentation/guards/policy.guard';
import { ResourceType } from '../../../../features/auth/presentation/guards/resource-type.enum';
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
import { createQuerySchema } from '../../../../shared/query/query.schema';
import { z } from 'zod';

const orgIdSchema = z.string().uuid();

const workspaceQuerySchema = createQuerySchema(
  ['name', 'createdAt', 'updatedAt'],
  ['name'],
);

@Controller()
export class WorkspacesController {
  constructor(
    private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    private readonly getWorkspaceUseCase: GetWorkspaceUseCase,
    private readonly getWorkspacesUseCase: GetWorkspacesUseCase,
    private readonly updateWorkspaceUseCase: UpdateWorkspaceUseCase,
    private readonly deleteWorkspaceUseCase: DeleteWorkspaceUseCase,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.ORGANIZATION, 'orgId')
  async create(
    @Param('orgId', new ZodValidationPipe(orgIdSchema)) orgId: string,
    @Body(new ZodValidationPipe(createWorkspaceSchema))
    body: CreateWorkspaceDto,
  ) {
    return this.createWorkspaceUseCase.execute({ ...body, orgId });
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.ORGANIZATION, 'orgId')
  async getAll(
    @Param('orgId', new ZodValidationPipe(orgIdSchema.optional()))
    orgId: string,
    @CurrentUser() user: AuthUser,
    @Query(new ZodValidationPipe(workspaceQuerySchema)) query: QueryOptions,
  ) {
    return this.getWorkspacesUseCase.execute({ orgId, userId: user.id }, query);
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.WORKSPACE, 'id')
  async get(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getWorkspaceUseCase.execute(id, user.id);
  }

  @Put(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.WORKSPACE, 'id')
  async update(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateWorkspaceSchema))
    body: UpdateWorkspaceDto,
  ) {
    return this.updateWorkspaceUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.WORKSPACE, 'id')
  async delete(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
  ) {
    return this.deleteWorkspaceUseCase.execute(id);
  }
}
