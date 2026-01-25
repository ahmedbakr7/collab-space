import { Injectable } from '@nestjs/common';
import { TagRepository } from '../../application/ports/tag.repository.interface';
import { Tag } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { TagMapper } from '../mappers/tag.mapper';

@Injectable()
export class PrismaTagRepository implements TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(tag: Tag): Promise<void> {
    await this.prisma.tag.upsert({
      where: { id: tag.id },
      update: {
        name: tag.name,
        orgId: tag.orgId,
      },
      create: {
        id: tag.id,
        name: tag.name,
        orgId: tag.orgId,
      },
    });
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });
    return tag ? TagMapper.toDomain(tag) : null;
  }

  async findByOrgId(orgId: string): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany({
      where: { orgId },
    });
    return tags.map(TagMapper.toDomain);
  }

  async findByName(orgId: string, name: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findFirst({
      where: { orgId, name },
    });
    return tag ? TagMapper.toDomain(tag) : null;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tag.delete({
      where: { id },
    });
  }
}
