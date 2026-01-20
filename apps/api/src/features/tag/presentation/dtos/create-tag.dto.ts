import { z } from 'zod';

export const createTagSchema = z.object({
  orgId: z.string().uuid(),
  name: z.string().min(1),
});

export interface CreateTagDto {
  orgId: string;
  name: string;
}
