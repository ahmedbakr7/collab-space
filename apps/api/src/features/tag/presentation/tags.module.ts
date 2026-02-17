import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';
import { CreateTagUseCase } from '../application/use-cases/create-tag.use-case';
import { GetTagsUseCase } from '../application/use-cases/get-tags.use-case';
import { DeleteTagUseCase } from '../application/use-cases/delete-tag.use-case';
import { PrismaTagRepository } from '../infrastructure/persistence/prisma-tag.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { TagRepository } from '../application/ports/tag.repository.interface';
import { AuthModule } from '../../auth/auth.module';

const TagRepositoryToken = 'TagRepository';

@Module({
  imports: [AuthModule],
  controllers: [TagsController],
  providers: [
    PrismaService,
    {
      provide: TagRepositoryToken,
      useClass: PrismaTagRepository,
    },
    {
      provide: CreateTagUseCase,
      useFactory: (tagRepository: TagRepository) =>
        new CreateTagUseCase(tagRepository),
      inject: [TagRepositoryToken],
    },
    {
      provide: GetTagsUseCase,
      useFactory: (tagRepository: TagRepository) =>
        new GetTagsUseCase(tagRepository),
      inject: [TagRepositoryToken],
    },
    {
      provide: DeleteTagUseCase,
      useFactory: (tagRepository: TagRepository) =>
        new DeleteTagUseCase(tagRepository),
      inject: [TagRepositoryToken],
    },
  ],
})
export class TagsModule {}
