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
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../../../auth/presentation/guards/supabase-auth.guard';
import { CreateOrganizationUseCase } from '../../application/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from '../../application/use-cases/get-organization.use-case';
import { GetOrganizationsUseCase } from '../../application/use-cases/get-organizations.use-case';
import { UpdateOrganizationUseCase } from '../../application/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from '../../application/use-cases/delete-organization.use-case';
import { GetPublicOrganizationsUseCase } from '../../application/use-cases/get-public-organizations.use-case';
import { JoinPublicOrganizationUseCase } from '../../application/use-cases/join-public-organization.use-case';
import {
  CreateOrganizationDto,
  createOrganizationSchema,
} from '../dtos/create-organization.dto';
import {
  UpdateOrganizationDto,
  updateOrganizationSchema,
} from '../dtos/update-organization.dto';
import { organizationIdSchema } from '../dtos/organization-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';

@Controller()
export class OrganizationsController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly getOrganizationUseCase: GetOrganizationUseCase,
    private readonly getOrganizationsUseCase: GetOrganizationsUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
    private readonly getPublicOrganizationsUseCase: GetPublicOrganizationsUseCase,
    private readonly joinPublicOrganizationUseCase: JoinPublicOrganizationUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createOrganizationSchema))
    body: CreateOrganizationDto,
  ) {
    return this.createOrganizationUseCase.execute(body);
  }

  @Get('public')
  @UseGuards(SupabaseAuthGuard)
  async getPublic() {
    return this.getPublicOrganizationsUseCase.execute();
  }

  @Post(':id/join')
  @UseGuards(SupabaseAuthGuard)
  async join(
    @Param('id', new ZodValidationPipe(organizationIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.joinPublicOrganizationUseCase.execute(id, user.id);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async getAll(@CurrentUser() user: AuthUser) {
    return this.getOrganizationsUseCase.execute(user.id);
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard)
  async get(
    @Param('id', new ZodValidationPipe(organizationIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getOrganizationUseCase.execute(id, user.id);
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(organizationIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateOrganizationSchema))
    body: UpdateOrganizationDto,
  ) {
    return this.updateOrganizationUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  async delete(
    @Param('id', new ZodValidationPipe(organizationIdSchema)) id: string,
  ) {
    return this.deleteOrganizationUseCase.execute(id);
  }
}
