import { z } from 'zod';

const questionSchema = z.object({
  questionText: z.string().min(5),
  options: z.array(z.string()).min(2),
  correctOptionIndex: z.number().int().nonnegative(),
});

export const createQuizSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    moduleId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Module ID'),
    questions: z.array(questionSchema).min(1),
    ecoPoints: z.number().nonnegative().optional(),
  }),
});

export const submitQuizSchema = z.object({
  body: z.object({
    answers: z.array(z.number().int().nonnegative()).min(1),
  }),
});

export const updateQuizSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    questions: z.array(questionSchema).optional(),
    ecoPoints: z.number().nonnegative().optional(),
  }),
});
