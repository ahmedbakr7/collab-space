import { z } from 'zod';

export const createOrgSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
  visibility: z.enum(['public', 'private']).default('private'),
});

export type CreateOrgValues = z.infer<typeof createOrgSchema>;

export const joinOrgSchema = z.object({
  inviteCode: z.string().min(1, 'Invite code is required'),
});

export type JoinOrgValues = z.infer<typeof joinOrgSchema>;
