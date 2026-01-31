import { z } from 'zod';
import { Visibility } from '@repo/domain';

export const updateOrganizationSchema = z
  .object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    visibility: z.nativeEnum(Visibility).optional(),
  })
  .strict();

export interface UpdateOrganizationDto {
  name?: string;
  description?: string;
  visibility?: Visibility;
}
