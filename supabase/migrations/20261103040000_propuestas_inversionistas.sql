-- Propuestas personalizadas a inversionistas (títulos Serie L / Tajacú) y registro de visitas.
-- Las tablas no tienen políticas para anon: la página pública solo usa las dos funciones de abajo.

create table if not exists public.propuestas (
  token text primary key default replace(gen_random_uuid()::text, '-', ''),
  nombre text not null,
  plantas integer not null,
  pago numeric not null,
  titulos integer not null,
  anio_plantacion integer not null default 2021,
  cohort text not null default '2021',
  notas text,
  created_at timestamptz not null default now()
);

create table if not exists public.propuesta_eventos (
  id bigserial primary key,
  token text not null references public.propuestas(token) on delete cascade,
  tipo text not null check (tipo in ('apertura', 'supuesto', 'tiempo')),
  detalle jsonb,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists propuesta_eventos_token_idx on public.propuesta_eventos (token, created_at);

alter table public.propuestas enable row level security;
alter table public.propuesta_eventos enable row level security;

-- Lectura de una propuesta por su token (lo único que ve el inversionista)
create or replace function public.get_propuesta(p_token text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object('nombre', nombre, 'pl', plantas, 'pago', pago, 'tit', titulos, 'year', anio_plantacion)
  from public.propuestas where token = p_token;
$$;

-- Registro de aperturas, supuestos movidos y tiempo en la página
create or replace function public.log_propuesta_evento(p_token text, p_tipo text, p_detalle jsonb default null, p_ua text default null)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.propuestas where token = p_token) then return; end if;
  if p_detalle is not null and length(p_detalle::text) > 2000 then p_detalle := null; end if;
  insert into public.propuesta_eventos (token, tipo, detalle, user_agent)
  values (p_token, p_tipo, p_detalle, left(p_ua, 300));
end;
$$;

revoke all on function public.get_propuesta(text) from public;
revoke all on function public.log_propuesta_evento(text, text, jsonb, text) from public;
grant execute on function public.get_propuesta(text) to anon, authenticated;
grant execute on function public.log_propuesta_evento(text, text, jsonb, text) to anon, authenticated;

-- Resumen para seguimiento (solo service role / panel con sesión)
create or replace view public.propuesta_seguimiento with (security_invoker = true) as
select p.nombre, p.titulos, p.token,
  count(*) filter (where e.tipo = 'apertura') as aperturas,
  min(e.created_at) filter (where e.tipo = 'apertura') as primera_apertura,
  max(e.created_at) as ultima_actividad,
  coalesce(sum((e.detalle->>'segundos')::numeric) filter (where e.tipo = 'tiempo'), 0) as segundos_en_pagina,
  count(*) filter (where e.tipo = 'supuesto') as supuestos_movidos,
  (array_agg(e.detalle order by e.created_at desc) filter (where e.tipo = 'supuesto'))[1] as ultimo_escenario
from public.propuestas p
left join public.propuesta_eventos e on e.token = p.token
group by p.nombre, p.titulos, p.token;
