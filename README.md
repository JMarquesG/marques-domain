## Marques Domain Monorepo

A TurboRepo monorepo that hosts multiple Next.js apps and shared packages. The main goals are:

- Consolidate apps and reusable libraries in one codebase
- Keep data-access and UI primitives decoupled from app logic
- Offer a clean local/dev setup and consistent CI-friendly scripts

The project uses TypeScript throughout and standardizes LLM interactions via the ai-sdk and OpenAI provider [[memory:7390155]].

## Repository Structure

```bash
.
├─ apps/
│  ├─ chatbot/        # RAG-enabled chat app (Next.js 14, server actions, AI streaming)
│  └─ home/           # Marketing/portfolio site (Next.js 15)
└─ packages/
   ├─ db/             # Supabase client helpers + SQL migrations
   └─ ui/             # Shared UI utilities/styles (Tailwind-compatible)
```

### apps/chatbot

- Next.js app that lets authenticated users upload PDFs, embeds content with OpenAI embeddings, and chat with RAG over their session data.
- Uses Supabase for auth, storage, and Postgres with pgvector.
- Streams AI responses using `ai` and `@ai-sdk/openai` with the `gpt-5-mini` model.

Key routes (handlers-only, no raw DB logic):

- `app/api/sessions/route.ts`: create a chat session
- `app/api/sessions/[id]/upload/route.ts`: upload and index a PDF into pgvector
- `app/api/chat/route.ts`: stream chat responses with top‑K retrieved context

### apps/home

- Next.js site for the public-facing homepage/portfolio.
- Uses Tailwind and a collection of UI primitives.

### packages/db

- Thin wrappers around Supabase clients for server and browser:
  - `supabase-server.ts` uses `SUPABASE_SERVICE_ROLE_KEY` (server only)
  - `supabase-browser.ts` uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- SQL migrations under `packages/db/migrations`:
  - `001_init.sql`: core tables (sessions, docs, chunks, messages, token_usage) and pgvector
  - `002_rls.sql`: RLS policies bound to `auth.uid()`
  - `003_functions.sql`: utility functions (`close_session`, `bump_usage`)
  - `004_match_fn.sql`: top‑K similarity function

### packages/ui

- Shared UI exports and styles (`index.css`) intended for consumption by apps.

## Prerequisites

- Node.js >= 18 and npm >= 10
- Supabase project (with auth, storage, and Postgres access)
- OpenAI API key

## Environment Variables

Create an `.env.local` file in `apps/chatbot` with at least:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # server-side only; do not expose to browser

# Optional pricing/budget tuning
PRICE_GPT5MINI_INPUT=0.15
PRICE_GPT5MINI_OUTPUT=0.60
PRICE_EMBEDDINGS_INPUT=0.02
CHAT_COST_CEIL_USD=0.30
MAX_UPLOAD_PAGES=50
```

Notes:

- `OPENAI_API_KEY` is used for embeddings and chat generation.
- The service role key is used only on the server (API routes) via `packages/db/src/supabase-server.ts`.
- You may add `EMBED_DIM` if changing the pgvector dimension in SQL, but the defaults assume 1536.

The `apps/home` app does not require environment variables by default.

## Supabase Setup

1) Enable extensions and run migrations in order (via SQL Editor or CLI):

```bash
packages/db/migrations/001_init.sql
packages/db/migrations/002_rls.sql
packages/db/migrations/003_functions.sql
packages/db/migrations/004_match_fn.sql
```

2) Create a storage bucket named `session-uploads` (private is fine; server writes with service role).

3) Ensure Auth is enabled; routes expect authenticated users and verified emails.

## Install and Develop

From the repository root:

```bash
npm install
npm run dev
```

This runs Turborepo `dev` across workspaces. By default:

- `apps/chatbot` runs on `http://localhost:3000`
- `apps/home` runs on `http://localhost:3002`

You can also run a single app:

```bash
cd apps/chatbot && npm run dev
# or
cd apps/home && npm run dev
```

## Build and Run in Production

From the root:

```bash
npm run build
```

Then start each app you need:

```bash
cd apps/chatbot && npm start
cd apps/home && npm start
```

## Architecture Notes

- The chat app validates environment variables with zod and enforces spend ceilings per user.
- Server-side API routes coordinate with Supabase (RLS protected) and stream AI responses.
- OpenAI interactions go through the ai-sdk provider to keep model usage consistent [[memory:7390155]].

Future work:

- Extract domain-level actions/finders/services into a dedicated `packages/backend` to further separate app controllers from business logic.

## Scripts (root)

- `npm run dev`: Run all workspaces in dev mode via Turbo
- `npm run build`: Build all workspaces
- `npm run check-types`: Type-check all workspaces
- `npm run format`: Prettier for `ts/tsx/md`

## License

Proprietary – all rights reserved unless otherwise specified.
