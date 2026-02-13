import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../application/ports/user.repository.interface';
import { User } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  }

  async findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<User | null> {
    const where = { id };

    const user = await this.prisma.user.findUnique({
      where,
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(filter?: { userId?: string }): Promise<User[]> {
    const where: any = {};
    if (filter?.userId) {
      where.organizations = {
        some: {
          organization: {
            members: {
              some: { userId: filter.userId },
            },
          },
        },
      };
    }
    const users = await this.prisma.user.findMany({ where });
    return users.map(UserMapper.toDomain);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
