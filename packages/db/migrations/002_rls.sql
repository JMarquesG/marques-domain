alter table public.sessions enable row level security;
alter table public.session_docs enable row level security;
alter table public.session_chunks enable row level security;
alter table public.session_messages enable row level security;
alter table public.token_usage enable row level security;

create or replace function public.uid() returns uuid
language sql stable as $$ select auth.uid() $$;

create policy if not exists "own sessions" on public.sessions
  for all using (user_id = public.uid()) with check (user_id = public.uid());

create policy if not exists "own docs" on public.session_docs
  for all using (session_id in (select id from public.sessions where user_id = public.uid()))
  with check (session_id in (select id from public.sessions where user_id = public.uid()));

create policy if not exists "own chunks" on public.session_chunks
  for all using (session_id in (select id from public.sessions where user_id = public.uid()))
  with check (session_id in (select id from public.sessions where user_id = public.uid()));

create policy if not exists "own messages" on public.session_messages
  for all using (session_id in (select id from public.sessions where user_id = public.uid()))
  with check (session_id in (select id from public.sessions where user_id = public.uid()));

create policy if not exists "own usage row" on public.token_usage
  for all using (user_id = public.uid()) with check (user_id = public.uid());

