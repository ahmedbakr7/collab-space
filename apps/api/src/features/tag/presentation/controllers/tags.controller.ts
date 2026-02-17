import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CheckPolicy } from '../../../../features/auth/presentation/decorators/check-policy.decorator';
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { PolicyGuard } from '../../../../features/auth/presentation/guards/policy.guard';
import { ResourceType } from '../../../../features/auth/presentation/guards/resource-type.enum';
import { CreateTagUseCase } from '../../application/use-cases/create-tag.use-case';
import { GetTagsUseCase } from '../../application/use-cases/get-tags.use-case';
import { DeleteTagUseCase } from '../../application/use-cases/delete-tag.use-case';
import { CreateTagDto, createTagSchema } from '../dtos/create-tag.dto';
import { tagIdSchema } from '../dtos/tag-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';

@Controller()
export class TagsController {
  constructor(
    private readonly createTagUseCase: CreateTagUseCase,
    private readonly getTagsUseCase: GetTagsUseCase,
    private readonly deleteTagUseCase: DeleteTagUseCase,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.ORGANIZATION, 'orgId')
  async create(
    @Body(new ZodValidationPipe(createTagSchema)) body: CreateTagDto,
  ) {
    return this.createTagUseCase.execute(body);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  @CheckPolicy(ResourceType.ORGANIZATION, 'orgId')
  async getAll(@Param('orgId') orgId: string) {
    return this.getTagsUseCase.execute(orgId);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard, PolicyGuard)
  async delete(@Param('id', new ZodValidationPipe(tagIdSchema)) id: string) {
    return this.deleteTagUseCase.execute(id);
  }
}
