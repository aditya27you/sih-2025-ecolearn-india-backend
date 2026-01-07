import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string().transform(Number).default(5000),
  MONGO_URI: z
    .string()
    .startsWith(
      'mongodb',
      'MONGO_URI must be a valid MongoDB connection string',
    ),
  JWT_SECRET: z.string().min(8, 'JWT_SECRET must be at least 8 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Cloudinary credentials (optional for now, but required for cloud storage)
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),

  // Frontend URL for CORS
  CLIENT_URL: z.string().url().default('http://localhost:5173'),

  // Email configuration
  EMAIL_USER: z.string().optional(),
  EMAIL_PASS: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;
