import { z } from 'zod';
import { Visibility } from '@repo/domain';

export const createOrganizationSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().optional(),
    visibility: z.nativeEnum(Visibility),
  })
  .required();

export interface CreateOrganizationDto {
  name: string;
  description?: string;
  visibility: Visibility;
}
