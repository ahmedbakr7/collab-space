import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1),
  })
  .required();

export interface CreateUserDto {
  email: string;
  name: string;
}
