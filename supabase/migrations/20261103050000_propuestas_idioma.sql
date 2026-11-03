-- Idioma de la propuesta (es/en) y aviso de títulos máximos para propuestas de excepción
alter table public.propuestas add column if not exists lang text not null default 'es' check (lang in ('es','en'));
alter table public.propuestas add column if not exists mostrar_maximo boolean not null default false;

create or replace function public.get_propuesta(p_token text)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object('nombre', nombre, 'pl', plantas, 'pago', pago, 'tit', titulos, 'year', anio_plantacion,
                           'lang', lang, 'max', mostrar_maximo)
  from public.propuestas where token = p_token;
$$;

update public.propuestas set lang = 'en' where nombre in ('Scott Weier', 'Jan Roubal');
update public.propuestas set mostrar_maximo = true where nombre = 'Scott Weier';
