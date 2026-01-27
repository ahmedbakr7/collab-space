import { z } from 'zod';
import { TaskPriority, TaskStatus } from '@repo/domain';

export const createTaskSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  assignedToId: z.string().uuid().optional(),
  dueDate: z.string().datetime().optional(),
});

export interface CreateTaskDto {
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string; // Received as string, converted to Date in controller/usecase
  createdById: string;
  assignedToId?: string;
}
