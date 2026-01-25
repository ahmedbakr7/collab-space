import { Organization as PrismaOrganization } from '@prisma/client';
import { Organization, Visibility } from '@repo/domain';

export class OrganizationMapper {
  static toDomain(prismaOrganization: PrismaOrganization): Organization {
    return new Organization(
      prismaOrganization.id,
      prismaOrganization.name,
      prismaOrganization.slug,
      prismaOrganization.description,
      prismaOrganization.visibility as Visibility,
      prismaOrganization.createdAt,
      prismaOrganization.updatedAt,
    );
  }
}
