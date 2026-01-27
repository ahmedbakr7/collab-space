import { z } from 'zod';

export const workspaceIdSchema = z.string().uuid();
