import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../application/ports/task.repository.interface';
import { Task } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { TaskMapper } from '../mappers/task.mapper';
import {
  buildPrismaWhere,
  buildPrismaOrderBy,
  buildPrismaPagination,
  buildPaginatedResult,
} from '../../../../shared/query/prisma-query.builder';

const TASK_FILTER_FIELD_MAP: Record<string, string> = {
  status: 'status',
  priority: 'priority',
  assignedToId: 'assignedToId',
  title: 'title',
};

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(task: Task): Promise<void> {
    await this.prisma.task.upsert({
      where: { id: task.id },
      update: {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        assignedToId: task.assignedToId,
        updatedAt: task.updatedAt,
      },
      create: {
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: task.dueDate,
        createdById: task.createdById,
        assignedToId: task.assignedToId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
    });
  }

  async findById(
    id: string,
    filter?: { userId?: string },
  ): Promise<Task | null> {
    const where: any = { id };
    if (filter?.userId) {
      where.project = {
        workspace: {
          organization: { members: { some: { userId: filter.userId } } },
        },
      };
    }

    const task = await this.prisma.task.findUnique({
      where,
      include: {
        comments: true,
        attachments: true,
        tags: { include: { tag: true } },
      },
    });
    return task ? TaskMapper.toDomain(task) : null;
  }

  async findAll(
    filter?: { projectId?: string; userId?: string },
    query?: QueryOptions,
  ): Promise<PaginatedResult<Task>> {
    const where: any = {
      ...buildPrismaWhere(query?.filters, TASK_FILTER_FIELD_MAP),
    };

    if (filter?.projectId) {
      where.projectId = filter.projectId;
    }
    if (filter?.userId) {
      where.project = {
        workspace: {
          organization: { members: { some: { userId: filter.userId } } },
        },
      };
    }

    const orderBy = buildPrismaOrderBy(query?.sort);
    const { skip, take } = buildPrismaPagination(query?.pagination);

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          comments: true,
          attachments: true,
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return buildPaginatedResult(
      tasks.map((t) => TaskMapper.toDomain(t)),
      total,
      query?.pagination,
    );
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: { projectId },
      include: {
        comments: true,
        attachments: true,
        tags: { include: { tag: true } },
      },
    });
    return tasks.map((t) => TaskMapper.toDomain(t));
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
