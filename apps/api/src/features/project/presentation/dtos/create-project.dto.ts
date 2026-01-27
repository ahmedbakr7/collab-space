import { z } from 'zod';

export const createProjectSchema = z.object({
  workspaceId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
});

export interface CreateProjectDto {
  workspaceId: string;
  name: string;
  slug: string;
  description: string;
}
