import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  avatar: z.string().optional(),
  data: z.record(z.any()).optional(),
});

export type RegisterUserRequestDto = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserRequestDto = z.infer<typeof loginUserSchema>;
