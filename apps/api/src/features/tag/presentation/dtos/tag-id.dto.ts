import { z } from 'zod';

export const tagIdSchema = z.string().uuid();
