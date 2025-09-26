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

Monorepo (Vercel) setup

1. Create two Vercel Projects pointing to this repo:
   - Home: `apps/home` as rootDirectory → primary domain `yourdomain.com`
   - Chatbot: `apps/chatbot` as rootDirectory → subdomain `chat.yourdomain.com`
2. Set Environment Variables in the Chatbot project (same values as local):
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - Optional price/config vars shown above
3. Connect both projects to the same Supabase instance (Auth/DB/Storage)
4. In Supabase Auth, enable email verification (and optionally Passkeys/WebAuthn)
5. Map domains in Vercel:
   - Home → `yourdomain.com`
   - Chatbot → `chat.yourdomain.com`
6. (Optional) Configure analytics separately for each project

Notes

- If using `packages/ui`, it is already workspace-shared; no extra changes required.
- Add a CTA/link in the Home app pointing to `https://chat.yourdomain.com` for discovery.

