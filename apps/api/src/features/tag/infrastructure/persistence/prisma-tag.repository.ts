import { Injectable } from '@nestjs/common';
import { TagRepository } from '../../application/ports/tag.repository.interface';
import { Tag } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { TagMapper } from '../mappers/tag.mapper';
import {
  buildPrismaWhere,
  buildPrismaOrderBy,
  buildPrismaPagination,
  buildPaginatedResult,
} from '../../../../shared/query/prisma-query.builder';

const TAG_FILTER_FIELD_MAP: Record<string, string> = {
  name: 'name',
};

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

  async findByOrgId(
    orgId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Tag>> {
    const where: any = {
      orgId,
      ...buildPrismaWhere(query?.filters, TAG_FILTER_FIELD_MAP),
    };

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({ where, orderBy, skip, take }),
      this.prisma.tag.count({ where }),
    ]);

    return buildPaginatedResult(
      tags.map(TagMapper.toDomain),
      total,
      query?.pagination,
    );
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
