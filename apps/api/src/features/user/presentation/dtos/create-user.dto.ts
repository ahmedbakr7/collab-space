import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(6),
  })
  .required();

export interface CreateUserDto {
  email: string;
  name: string;
  password: string;
}
