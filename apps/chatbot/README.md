Chatbot App

Next.js 14 App Router app to upload a PDF (≤50 pages) and chat with it. Ephemeral session storage in Supabase (pgvector + Storage), persistent token ledger with a $0.30 cap. Streaming via Vercel AI SDK; embeddings via OpenAI.

Env

Copy to .env.local:

```
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PRICE_GPT5MINI_INPUT=0.15
PRICE_GPT5MINI_OUTPUT=0.60
PRICE_EMBEDDINGS_INPUT=0.02
CHAT_COST_CEIL_USD=0.30
MAX_UPLOAD_PAGES=50
EMBED_DIM=1536
```

Migrations

Apply SQL in packages/db/migrations (001 → 004) in Supabase SQL Editor. Create private Storage bucket session-uploads.

Develop

```
pnpm i
pnpm dev
```

Deploy

- Set env vars in Vercel
- Link to same Supabase project
- Enable WebAuthn (Passkeys) + email verification in Supabase Auth
- Optional: schedule purge for closed sessions

