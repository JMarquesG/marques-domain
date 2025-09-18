-- Enable pgvector
create extension if not exists vector;

-- Session (ephemeral)
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  closed_at timestamptz,
  alive boolean not null default true,
  channel text generated always as ('session_' || id::text) stored
);

-- Uploaded docs (ephemeral)
create table if not exists public.session_docs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  filename text not null,
  storage_path text not null,
  pages int not null,
  created_at timestamptz not null default now()
);

-- Chunks (ephemeral)
create table if not exists public.session_chunks (
  id bigserial primary key,
  session_id uuid not null references public.sessions(id) on delete cascade,
  doc_id uuid not null references public.session_docs(id) on delete cascade,
  chunk_index int not null,
  content text not null,
  embedding vector(1536) not null,
  tokens int not null default 0,
  page_from int,
  page_to int
);
create index if not exists session_chunks_embedding_idx on public.session_chunks using ivfflat (embedding vector_cosine_ops) with (lists = 100);
create index if not exists session_chunks_session_idx on public.session_chunks (session_id);

-- Messages (ephemeral)
do $$ begin
  create type public.role as enum ('user','assistant','system','tool');
exception when duplicate_object then null; end $$;

create table if not exists public.session_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  role public.role not null,
  content text not null,
  created_at timestamptz not null default now()
);
create index if not exists session_messages_idx on public.session_messages (session_id, created_at);

-- Persistent usage ledger
create table if not exists public.token_usage (
  user_id uuid primary key references auth.users(id) on delete cascade,
  input_tokens bigint not null default 0,
  output_tokens bigint not null default 0,
  embed_tokens bigint not null default 0,
  usd_spent numeric(10,4) not null default 0.0,
  updated_at timestamptz not null default now()
);

