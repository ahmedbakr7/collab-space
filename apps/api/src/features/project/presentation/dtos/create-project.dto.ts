import { z } from 'zod';

export const createProjectSchema = z.object({
  orgId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string(),
});

export interface CreateProjectDto {
  orgId: string;
  name: string;
  slug: string;
  description: string;
}
