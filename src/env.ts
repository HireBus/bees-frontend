import { z } from 'zod';
import { STAGES } from './constants/env';

const envSchema = z.object({
  STAGE: z.nativeEnum(STAGES).default(STAGES.Dev),
  BEES_API_URL: z.string().url(),
  CORE_API_V1_URL: z.string().url(),
  CORE_API_V2_URL: z.string().url(),
});

export const envConfig = envSchema.parse({
  STAGE: import.meta.env.VITE_STAGE,
  BEES_API_URL: import.meta.env.VITE_BEES_API_URL,
  CORE_API_V1_URL: import.meta.env.VITE_CORE_API_V1_URL,
  CORE_API_V2_URL: import.meta.env.VITE_CORE_API_V2_URL,
});

export type EnvConfig = z.infer<typeof envSchema>;
