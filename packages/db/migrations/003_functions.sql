create or replace function public.close_session(p_session uuid)
returns void language plpgsql security definer as $$
begin
  update public.sessions set alive=false, closed_at=now() where id=p_session and user_id=auth.uid();
end $$;

create or replace function public.bump_usage(p_user uuid, p_in bigint, p_out bigint, p_emb bigint, p_usd numeric)
returns void language plpgsql security definer as $$
begin
  insert into public.token_usage as t (user_id, input_tokens, output_tokens, embed_tokens, usd_spent, updated_at)
  values (p_user, p_in, p_out, p_emb, p_usd, now())
  on conflict (user_id) do update set
    input_tokens = t.input_tokens + excluded.input_tokens,
    output_tokens = t.output_tokens + excluded.output_tokens,
    embed_tokens = t.embed_tokens + excluded.embed_tokens,
    usd_spent = t.usd_spent + excluded.usd_spent,
    updated_at = now();
end $$;

