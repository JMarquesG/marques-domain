-- Function to retrieve top-k chunks with full metadata to avoid large client-side queries
create or replace function public.match_chunks_full(
  p_session uuid,
  p_query vector,
  p_k int
) returns table(
  content text,
  page_from int,
  page_to int,
  doc_id text,
  distance float4
)
language sql stable as $$
  select 
    c.content,
    c.page_from,
    c.page_to,
    c.doc_id,
    (c.embedding <-> p_query)::float4 as distance
  from public.session_chunks c
  where c.session_id = p_session
  order by c.embedding <-> p_query
  limit p_k;
$$;


