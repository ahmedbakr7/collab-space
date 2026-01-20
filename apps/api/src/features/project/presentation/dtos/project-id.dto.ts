import { z } from 'zod';

export const projectIdSchema = z.string().uuid();
