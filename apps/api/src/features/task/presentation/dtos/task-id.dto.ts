import { z } from 'zod';

export const taskIdSchema = z.string().uuid();
