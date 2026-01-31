
import { Tag } from '../../tag/entities/tag.entity';
import { TaskComment } from './task-comment.entity';
import { Attachment } from './attachment.entity';

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class Task {
  constructor(
    public readonly id: string,
    public readonly projectId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly status: TaskStatus,
    public readonly priority: TaskPriority,
    public readonly dueDate: Date | null,
    public readonly createdById: string,
    public readonly assignedToId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly tags: Tag[] = [],
    public readonly comments: TaskComment[] = [],
    public readonly attachments: Attachment[] = [],
  ) {}
}
