import { z } from 'zod';

export const updateProjectSchema = z
  .object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
  })
  .strict();

export interface UpdateProjectDto {
  name?: string;
  slug?: string;
  description?: string;
}
