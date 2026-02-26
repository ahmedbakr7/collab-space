import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../application/ports/organization.repository.interface';
import { Organization } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { Visibility as PrismaVisibility } from '@prisma/client';
import {
  buildPrismaWhere,
  buildPrismaOrderBy,
  buildPrismaPagination,
  buildPaginatedResult,
} from '../../../../shared/query/prisma-query.builder';

const ORG_FILTER_FIELD_MAP: Record<string, string> = {
  name: 'name',
  visibility: 'visibility',
};

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(organization: Organization): Promise<void> {
    await this.prisma.organization.upsert({
      where: { id: organization.id },
      update: {
        name: organization.name,
        description: organization.description,
        visibility: organization.visibility as PrismaVisibility,
        updatedAt: organization.updatedAt,
      },
      create: {
        id: organization.id,
        name: organization.name,
        description: organization.description,
        visibility: organization.visibility as PrismaVisibility,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      },
    });
  }

  async findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Organization | null> {
    const where: any = { id };
    if (filter?.userId) {
      where.members = { some: { userId: filter.userId } };
    }
    const organization = await this.prisma.organization.findUnique({
      where,
    });
    return organization ? OrganizationMapper.toDomain(organization) : null;
  }

  async findAll(
    filter?: { userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>> {
    const where: any = {
      ...buildPrismaWhere(query?.filters, ORG_FILTER_FIELD_MAP),
    };

    if (filter?.userId) {
      where.members = { some: { userId: filter.userId } };
    }

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({ where, orderBy, skip, take }),
      this.prisma.organization.count({ where }),
    ]);

    return buildPaginatedResult(
      organizations.map(OrganizationMapper.toDomain),
      total,
      query?.pagination,
    );
  }

  async findPublic(
    query?: QueryOptions,
  ): Promise<PaginatedResult<Organization>> {
    const where: any = {
      visibility: PrismaVisibility.public,
      ...buildPrismaWhere(query?.filters, ORG_FILTER_FIELD_MAP),
    };

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({ where, orderBy, skip, take }),
      this.prisma.organization.count({ where }),
    ]);

    return buildPaginatedResult(
      organizations.map((org) => OrganizationMapper.toDomain(org)),
      total,
      query?.pagination,
    );
  }

  async addMember(organizationId: string, userId: string): Promise<void> {
    await this.prisma.organizationMember.create({
      data: {
        orgId: organizationId,
        userId: userId,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.organization.delete({
      where: { id },
    });
  }
}
