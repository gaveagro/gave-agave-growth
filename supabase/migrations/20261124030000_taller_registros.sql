-- Registro previo al taller práctico de IA para abogados (página estática /taller).
-- Sin políticas para anon: el formulario sólo puede llamar a registrar_taller(); nadie puede leer por la API pública.

create table if not exists public.taller_registros (
  id bigserial primary key,
  taller text not null default 'ia-abogados-2026',
  nombre text not null,
  contacto text not null,
  respuestas jsonb not null default '{}'::jsonb,
  acepta_contacto boolean not null default false,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.taller_registros enable row level security;

create or replace function public.registrar_taller(p_nombre text, p_contacto text, p_respuestas jsonb, p_acepta_contacto boolean, p_user_agent text default null)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(length(trim(p_nombre)), 0) = 0 or coalesce(length(trim(p_contacto)), 0) = 0 then
    raise exception 'nombre y contacto son obligatorios';
  end if;
  if length(p_nombre) > 200 or length(p_contacto) > 200 or length(p_respuestas::text) > 20000 then
    raise exception 'respuesta demasiado larga';
  end if;
  if jsonb_typeof(p_respuestas) <> 'object' then
    raise exception 'formato inválido';
  end if;
  insert into public.taller_registros (nombre, contacto, respuestas, acepta_contacto, user_agent)
  values (trim(p_nombre), trim(p_contacto), p_respuestas, coalesce(p_acepta_contacto, false), left(p_user_agent, 300));
  return true;
end;
$$;

revoke all on function public.registrar_taller(text, text, jsonb, boolean, text) from public;
grant execute on function public.registrar_taller(text, text, jsonb, boolean, text) to anon, authenticated;
