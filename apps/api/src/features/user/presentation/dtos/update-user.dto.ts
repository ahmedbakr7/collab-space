import { z } from 'zod';

export const updateUserSchema = z
  .object({
    email: z.string().email().optional(),
    name: z.string().min(1).optional(),
    password: z.string().min(6).optional(),
  })
  .strict();

export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
}
