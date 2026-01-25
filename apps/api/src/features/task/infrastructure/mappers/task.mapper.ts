import { Task as PrismaTask } from '@prisma/client';
import { Task, TaskStatus, TaskPriority } from '@repo/domain';

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return new Task(
      prismaTask.id,
      prismaTask.projectId,
      prismaTask.title,
      prismaTask.description,
      prismaTask.status as TaskStatus,
      prismaTask.priority as TaskPriority,
      prismaTask.dueDate,
      prismaTask.createdById,
      prismaTask.assignedToId,
      prismaTask.createdAt,
      prismaTask.updatedAt,
    );
  }
}
