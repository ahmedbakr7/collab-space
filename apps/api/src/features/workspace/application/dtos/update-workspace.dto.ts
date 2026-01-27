import { z } from 'zod';

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type UpdateWorkspaceDto = z.infer<typeof updateWorkspaceSchema>;
