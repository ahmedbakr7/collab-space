import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100),
  description: z.string().optional(),
  projectId: z.string().min(1, 'Project is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
});

export type CreateTaskValues = z.infer<typeof createTaskSchema>;
