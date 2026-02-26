import {
  Task as PrismaTask,
  TaskComment as PrismaComment,
  Attachment as PrismaAttachment,
  TaskTag,
  Tag as PrismaTag,
} from '@prisma/client';
import {
  Task,
  TaskStatus,
  TaskPriority,
  TaskComment,
  Attachment,
  Tag,
} from '@repo/domain';

type PrismaTaskWithRelations = PrismaTask & {
  comments?: PrismaComment[];
  attachments?: PrismaAttachment[];
  tags?: (TaskTag & { tag: PrismaTag })[];
  project?: {
    id: string;
    name: string;
    workspace: { id: string; name: string };
  };
  assignedTo?: { id: string; name: string; avatarUrl: string | null } | null;
};

export class TaskMapper {
  static toDomain(prismaTask: PrismaTaskWithRelations): Task {
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
      (prismaTask.tags || []).map(
        (tt) => new Tag(tt.tag.id, tt.tag.name, tt.tag.orgId),
      ),
      (prismaTask.comments || []).map(
        (c) =>
          new TaskComment(
            c.id,
            c.taskId,
            c.userId,
            c.content,
            c.createdAt,
            c.updatedAt,
          ),
      ),
      (prismaTask.attachments || []).map(
        (a) =>
          new Attachment(
            a.id,
            a.taskId,
            a.uploadedById,
            a.fileName,
            a.fileType,
            a.fileSize,
            a.url,
            a.createdAt,
          ),
      ),
      prismaTask.assignedTo
        ? {
            id: prismaTask.assignedTo.id,
            name: prismaTask.assignedTo.name,
            avatarUrl: prismaTask.assignedTo.avatarUrl,
          }
        : undefined,
      prismaTask.project
        ? { id: prismaTask.project.id, name: prismaTask.project.name }
        : undefined,
      prismaTask.project?.workspace
        ? {
            id: prismaTask.project.workspace.id,
            name: prismaTask.project.workspace.name,
          }
        : undefined,
    );
  }
}
