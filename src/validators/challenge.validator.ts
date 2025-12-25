import { z } from 'zod';

export const createChallengeSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    ecoPoints: z.number().nonnegative(),
    deadline: z.string().datetime(), // Expect ISO string
  }),
});

export const updateChallengeSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    ecoPoints: z.number().nonnegative().optional(),
    deadline: z.string().datetime().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const processSubmissionSchema = z.object({
  body: z.object({
    feedback: z.string().optional(),
  }),
});
