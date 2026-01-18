import { User as PrismaUser } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      prismaUser.passwordHash,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
