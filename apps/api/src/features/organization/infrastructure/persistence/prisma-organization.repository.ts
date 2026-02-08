import { Injectable } from '@nestjs/common';
import { OrganizationRepository } from '../../application/ports/organization.repository.interface';
import { Organization } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { OrganizationMapper } from '../mappers/organization.mapper';
import { Visibility as PrismaVisibility } from '@prisma/client';

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

  async findAll(filter?: { userId?: string }): Promise<Organization[]> {
    const where: any = {};
    if (filter?.userId) {
      where.members = { some: { userId: filter.userId } };
    }
    const organizations = await this.prisma.organization.findMany({ where });
    return organizations.map(OrganizationMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.organization.delete({
      where: { id },
    });
  }
}
