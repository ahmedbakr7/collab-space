import { z } from 'zod';
import { TaskPriority, TaskStatus } from '@repo/domain';

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
    dueDate: z.string().datetime().optional(),
    assignedToId: z.string().uuid().nullable().optional(),
  })
  .strict();

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedToId?: string | null;
}
