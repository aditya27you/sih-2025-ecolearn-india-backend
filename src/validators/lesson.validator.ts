import { z } from 'zod';

export const createLessonSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    videoUrl: z.string().url('Invalid video URL').optional(),
    moduleId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Module ID'),
    order: z.number().int().nonnegative(),
  }),
});

export const updateLessonSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    videoUrl: z.string().url().optional(),
    order: z.number().int().nonnegative().optional(),
  }),
});
