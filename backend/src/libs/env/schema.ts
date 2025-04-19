import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number(),
  TEMP_FOLDER: z.string(),
  DATABASE_URL: z.string().url(),
});

export type Env = z.infer<typeof envSchema>;
