import { z } from 'zod';
import { Visibility } from '../../domain/entities/organization.entity';

export const createOrganizationSchema = z
  .object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string(),
    visibility: z.nativeEnum(Visibility),
  })
  .required();

export interface CreateOrganizationDto {
  name: string;
  slug: string;
  description: string;
  visibility: Visibility;
}
