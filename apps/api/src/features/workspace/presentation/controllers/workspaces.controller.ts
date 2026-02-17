import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '@repo/domain';
import { CurrentUser } from '../../../../features/auth/presentation/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { OrgMemberGuard } from '../../../../features/auth/presentation/guards/org-member.guard';
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
  @UseGuards(SupabaseAuthGuard, OrgMemberGuard)
  async create(
    @Param('orgId', new ZodValidationPipe(orgIdSchema)) orgId: string,
    @Body(new ZodValidationPipe(createWorkspaceSchema))
    body: CreateWorkspaceDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.createWorkspaceUseCase.execute({ ...body, orgId });
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, OrgMemberGuard)
  async getAll(
    @Param('orgId', new ZodValidationPipe(orgIdSchema.optional()))
    orgId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getWorkspacesUseCase.execute({ orgId, userId: user.id });
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard, OrgMemberGuard)
  async get(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getWorkspaceUseCase.execute(id, user.id);
  }

  @Put(':id')
  @UseGuards(SupabaseAuthGuard, OrgMemberGuard)
  async update(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateWorkspaceSchema))
    body: UpdateWorkspaceDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.updateWorkspaceUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, OrgMemberGuard)
  async delete(
    @Param('id', new ZodValidationPipe(workspaceIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.deleteWorkspaceUseCase.execute(id);
  }
}
