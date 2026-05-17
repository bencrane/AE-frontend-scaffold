import 'server-only';
import { z } from 'zod';

const schema = z.object({
  // Supabase — public (also surfaced via NEXT_PUBLIC_* to browser).
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),

  // Supabase — server-only.
  AE_SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  AE_DB_POOLED_URL: z.string().min(1),

  // DEX (data-engine-x) — server-only proxy reads.
  DEX_BASE_URL: z.string().url(),
  DEX_SERVICE_TOKEN: z.string().min(1),

  APP_ENV: z.enum(['dev', 'stg', 'prd']),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  AE_SUPABASE_SERVICE_ROLE_KEY: process.env.AE_SUPABASE_SERVICE_ROLE_KEY,
  AE_DB_POOLED_URL: process.env.AE_DB_POOLED_URL,
  DEX_BASE_URL: process.env.DEX_BASE_URL,
  DEX_SERVICE_TOKEN: process.env.DEX_SERVICE_TOKEN,
  APP_ENV: process.env.APP_ENV,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('; ');
  throw new Error(`Invalid environment: ${issues}`);
}

export const env = parsed.data;
