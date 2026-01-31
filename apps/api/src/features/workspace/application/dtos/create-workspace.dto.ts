import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
