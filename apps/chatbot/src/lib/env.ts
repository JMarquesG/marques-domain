import { z } from 'zod'

export const EnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  PRICE_GPT5MINI_INPUT: z.string().optional(),
  PRICE_GPT5MINI_OUTPUT: z.string().optional(),
  PRICE_EMBEDDINGS_INPUT: z.string().optional(),
  CHAT_COST_CEIL_USD: z.string().optional(),
  MAX_UPLOAD_PAGES: z.string().optional(),
  EMBED_DIM: z.string().optional(),
})

export function getEnv(){
  const parsed = EnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const msg = parsed.error.errors.map(e=>`${e.path.join('.')}: ${e.message}`).join(', ')
    throw new Error(`Invalid environment: ${msg}`)
  }
  return parsed.data
}

