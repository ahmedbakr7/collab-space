import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  orgId: z.string().uuid(),
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
});

export type CreateWorkspaceDto = z.infer<typeof createWorkspaceSchema>;
