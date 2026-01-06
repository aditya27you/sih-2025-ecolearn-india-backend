import { z } from 'zod';

export const createModuleSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters'),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    ecoPoints: z.number().nonnegative().optional(),
  }),
});

export const updateModuleSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
    ecoPoints: z.number().nonnegative().optional(),
  }),
});
