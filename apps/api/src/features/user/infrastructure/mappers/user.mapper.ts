import { User as PrismaUser } from '@prisma/client';
import { User } from '@repo/domain';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.avatarUrl || undefined,
    );
  }
}
