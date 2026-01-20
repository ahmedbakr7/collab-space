import { Tag as PrismaTag } from '@prisma/client';
import { Tag } from '../../domain/entities/tag.entity';

export class TagMapper {
  static toDomain(prismaTag: PrismaTag): Tag {
    return new Tag(prismaTag.id, prismaTag.name, prismaTag.orgId);
  }
}
