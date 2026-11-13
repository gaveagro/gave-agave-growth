-- Listas de precios compartidas con un link único por destinatario (distribuidores, etc.)
-- y registro de aperturas/clicks con ubicación aproximada (la pone la edge function de Netlify a partir de la IP).
-- Sin políticas para anon: solo se usan las dos funciones de abajo.

create table if not exists public.listas_compartidas (
  token text primary key default replace(gen_random_uuid()::text, '-', ''),
  nombre text not null,
  empresa text,
  lista text not null check (lista in ('distribuidores', 'comercial_por_caja', 'precios', 'accionistas_serie_l')),
  activo boolean not null default true,
  notas text,
  created_at timestamptz not null default now()
);

create table if not exists public.lista_eventos (
  id bigserial primary key,
  token text not null references public.listas_compartidas(token) on delete cascade,
  tipo text not null check (tipo in ('apertura', 'click', 'scroll', 'tiempo', 'imprimir', 'copiar')),
  detalle jsonb,
  ip text,
  ciudad text,
  region text,
  pais text,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists lista_eventos_token_idx on public.lista_eventos (token, created_at);

alter table public.listas_compartidas enable row level security;
alter table public.lista_eventos enable row level security;

create or replace function public.get_lista_compartida(p_token text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object('nombre', nombre, 'empresa', empresa, 'lista', lista)
  from public.listas_compartidas where token = p_token and activo;
$$;

create or replace function public.log_lista_evento(
  p_token text, p_tipo text, p_detalle jsonb default null, p_ua text default null,
  p_ip text default null, p_ciudad text default null, p_region text default null, p_pais text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.listas_compartidas where token = p_token) then return; end if;
  if p_tipo not in ('apertura', 'click', 'scroll', 'tiempo', 'imprimir', 'copiar') then return; end if;
  if p_detalle is not null and length(p_detalle::text) > 2000 then p_detalle := null; end if;
  insert into public.lista_eventos (token, tipo, detalle, ip, ciudad, region, pais, user_agent)
  values (p_token, p_tipo, p_detalle, left(p_ip, 64), left(p_ciudad, 120), left(p_region, 120), left(p_pais, 8), left(p_ua, 300));
end;
$$;

revoke all on function public.get_lista_compartida(text) from public;
revoke all on function public.log_lista_evento(text, text, jsonb, text, text, text, text, text) from public;
grant execute on function public.get_lista_compartida(text) to anon, authenticated;
grant execute on function public.log_lista_evento(text, text, jsonb, text, text, text, text, text) to anon, authenticated;

-- Resumen por destinatario (solo service role / panel con sesión)
create or replace view public.lista_seguimiento with (security_invoker = true) as
select l.nombre, l.empresa, l.lista, l.token,
  count(*) filter (where e.tipo = 'apertura') as aperturas,
  count(distinct e.ip) filter (where e.tipo = 'apertura') as ips_distintas,
  string_agg(distinct nullif(concat_ws(', ', e.ciudad, e.region, e.pais), ''), ' | ') filter (where e.tipo = 'apertura') as ubicaciones,
  min(e.created_at) filter (where e.tipo = 'apertura') as primera_apertura,
  max(e.created_at) as ultima_actividad,
  count(*) filter (where e.tipo = 'click') as clicks,
  coalesce(sum((e.detalle->>'segundos')::numeric) filter (where e.tipo = 'tiempo'), 0) as segundos_en_pagina,
  max((e.detalle->>'pct')::numeric) filter (where e.tipo = 'scroll') as scroll_max_pct
from public.listas_compartidas l
left join public.lista_eventos e on e.token = l.token
group by l.nombre, l.empresa, l.lista, l.token;

-- Detalle de eventos, más reciente primero
create or replace view public.lista_eventos_detalle with (security_invoker = true) as
select l.nombre, e.created_at at time zone 'America/Mexico_City' as fecha_cdmx, e.tipo, e.detalle,
  e.ciudad, e.region, e.pais, e.ip, e.user_agent
from public.lista_eventos e join public.listas_compartidas l on l.token = e.token
order by e.created_at desc;
