import { z } from 'zod';

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  data: z.record(z.any()).optional(),
});

export type RegisterUserRequestDto = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserRequestDto = z.infer<typeof loginUserSchema>;
