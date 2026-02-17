import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SupabaseAuthGuard } from '../../../../features/auth/presentation/guards/supabase-auth.guard';
import { CreateTagUseCase } from '../../application/use-cases/create-tag.use-case';
import { GetTagsUseCase } from '../../application/use-cases/get-tags.use-case';
import { DeleteTagUseCase } from '../../application/use-cases/delete-tag.use-case';
import { CreateTagDto, createTagSchema } from '../dtos/create-tag.dto';
import { tagIdSchema } from '../dtos/tag-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';
import { z } from 'zod';

const orgIdQuerySchema = z.string().uuid();

@Controller('tags')
export class TagsController {
  constructor(
    private readonly createTagUseCase: CreateTagUseCase,
    private readonly getTagsUseCase: GetTagsUseCase,
    private readonly deleteTagUseCase: DeleteTagUseCase,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(
    @Body(new ZodValidationPipe(createTagSchema)) body: CreateTagDto,
  ) {
    return this.createTagUseCase.execute(body);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async getAll(
    @Query('orgId', new ZodValidationPipe(orgIdQuerySchema)) orgId: string,
  ) {
    return this.getTagsUseCase.execute(orgId);
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  async delete(@Param('id', new ZodValidationPipe(tagIdSchema)) id: string) {
    return this.deleteTagUseCase.execute(id);
  }
}
