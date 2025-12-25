import { z } from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    grade: z.number().min(6).max(12).optional(), // Grade 6-12 as per model
  }),
});
