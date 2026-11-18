-- Permite compartir la presentación de proyecciones con link único (/proyecciones/<token>)
alter table public.listas_compartidas drop constraint if exists listas_compartidas_lista_check;
alter table public.listas_compartidas add constraint listas_compartidas_lista_check
  check (lista in ('distribuidores', 'comercial_por_caja', 'precios', 'accionistas_serie_l', 'proyecciones'));
