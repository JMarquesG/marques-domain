-- Function to retrieve top-k chunks by cosine distance
create or replace function public.match_chunks(
  p_session uuid,
  p_query vector,
  p_k int
) returns table(content text, distance float4)
language sql stable as $$
  select c.content, (c.embedding <-> p_query)::float4 as distance
  from public.session_chunks c
  where c.session_id = p_session
  order by c.embedding <-> p_query
  limit p_k;
$$;

