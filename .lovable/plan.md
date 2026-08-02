# Rediseño Gavé: de crowdgrowing a plataforma climática

## Idea central

Hoy el sitio vende una sola cosa (invertir en plantas) y el visitante llega justo cuando Google le muestra los precios bajos del agave. El rediseño invierte el orden: **primero el impacto climático y la evidencia**, después las rutas de negocio. El crowdgrowing deja de ser el héroe y pasa a ser una de cuatro puertas.

## Las cuatro puertas de Gavé

1. **Inversión de impacto** — proyectos agroforestales / agrosilvopastoriles con agave, ganadería regenerativa, cosecha de agua, monitoreo satelital. Para firmas, ONGs, gobiernos.
2. **Certificación de carbono para ranchos** — dueños de +8,000 ha en zonas áridas: Gavé los lleva a emitir bonos (carbono, ganadería regenerativa en zonas áridas) a cambio de comisión.
3. **Vivero / venta de planta** — Espadín y **Salmiana** (la especie ideal para reforestación de zonas áridas, con precio de hijuelo al alza). Este es el motor de ingresos a reactivar.
4. **Patrocinio y donación de hectáreas** — empresas e individuos compensan huella apadrinando hectáreas restauradas.

## Sistema de diseño

- Paleta: papel `#f5f3ee` / `#e8e4dd`, tinta verde profundo `#1a3c2a`, acento amarillo Gavé `#f2b705`. Editorial claro, alto contraste, nada de gradientes morados.
- Tipografía: **Space Grotesk** (títulos) + **DM Sans** (cuerpo), vía Google Fonts.
- Todo como tokens semánticos en `index.css` + `tailwind.config.ts`. Se elimina el look "plantilla verde 2023".
- Layout editorial: secciones full-width alternadas con bandas de datos, mucho aire, números grandes, fotos reales de las parcelas a sangre.

## Estructura del nuevo homepage

```text
1  Header (logo, nav por puertas, ES/EN, CTA "Agendar llamada")
2  Hero climático — foto de parcela, titular sobre regeneración de
   tierras áridas, 2 CTAs: "Ver el modelo" / "Invertir o certificar"
3  Barra de métricas vivas — ha en restauración, tCO2e/ha/año,
   plantas en vivero, cabezas en manejo regenerativo (contadores animados)
4  El modelo Gavé — agave + ganadería regenerativa + cosecha de agua
   + monitoreo satelital, en diagrama visual interactivo
5  Evidencia y monitoreo — mapas/satélite, MRV, ruta a certificación
6  Cuatro puertas — tarjetas grandes hacia cada línea de negocio
7  Portafolio de proyectos / parcelas reales con fotos
8  Prueba social: aliados, testimonios, blog
9  FAQ reescritas (ver abajo)
10 CTA final + Footer (© 2026)
```

## Páginas

- `/` homepage nuevo (arriba).
- `/inversion-de-impacto` — tesis, modelo agroforestal, retornos + impacto, dossier descargable, formulario para firmas/ONGs. Pensada para tus reuniones en España, Alemania y Turquía.
- `/bonos-de-carbono` — para dueños de rancho: elegibilidad (+8,000 ha, zonas áridas), proceso paso a paso, qué aporta Gavé, modelo de comisión, formulario de precalificación del rancho.
- `/vivero` — catálogo de planta: **Espadín** y **Salmiana**, usos (mezcal vs reforestación de zonas áridas), precio por cm, volúmenes, logística, cotización. La landing actual `/hijuelos-espadin` se conserva y enlaza aquí.
- `/compensa` — patrocinio/donación de hectáreas, con tarjetas de paquetes y qué recibe el patrocinador.
- `/crowdgrowing` — el modelo actual movido aquí, con el simulador existente intacto; ya no vive en el homepage.
- Blog, política de privacidad, admin: se mantienen, heredan el nuevo estilo.

## FAQ reescritas

Se reemplaza el bloque actual (100% crowdgrowing) por FAQ por audiencia, con pestañas: Inversión de impacto · Ranchos y carbono · Vivero · Crowdgrowing. Se incluye una respuesta directa y honesta al tema de los precios bajos del agave — explicando por qué el modelo de Gavé no depende del precio spot del kg (bonos, ganadería, agua, transformación, vivero). Eso desactiva la objeción antes de que Google la genere.

## Sobre las librerías que mencionas

- **motion.dev (Motion for React)** — sí. Es la base: reveals al hacer scroll, contadores, transiciones de layout entre las pestañas y tarjetas. Ligera y encaja con React.
- **anime.js** — no. Se solapa con Motion; usar las dos duplica peso sin ganancia.
- **kokonut UI** — se toman patrones puntuales (tarjetas, hero, marquee de aliados) reconstruidos sobre shadcn y los tokens de Gavé, en vez de instalar otra librería de estilos.
- **bklit UI / gráficas** — sí, hacen falta visuales de datos (curva de captura de CO2e, ingresos por línea, cobertura de hectáreas). Se implementan con Recharts, que ya está en el proyecto, con el estilo editorial de la paleta.
- **manus.im** — herramienta externa de generación; no aplica dentro del repo.

## Detalles técnicos

- Nuevos tokens y fuentes en `src/index.css` y `tailwind.config.ts`; se retira la dependencia de `Inter` y de las utilidades `gave-*` heredadas donde ya no apliquen.
- `motion` como nueva dependencia; animaciones respetando `prefers-reduced-motion`.
- Componentes nuevos bajo `src/components/home/`, `src/components/carbon/`, `src/components/vivero/`; los actuales (`InvestmentSimulator`, `MonitoringPlatform`, `OurFarms`, `Blog`) se reubican y re-estilizan, no se tiran.
- Rutas nuevas en `src/App.tsx`, cada una con `SEO.tsx` (título, descripción, canonical, JSON-LD propio) y añadidas a `public/sitemap.xml`.
- Contenido bilingüe ES/EN en `public/content/*.json` siguiendo el patrón de `useContent`, para que siga siendo editable desde el CMS.
- Footer: `© 2026 Gavé` en ambos idiomas.
- Formularios nuevos reutilizan la Edge Function `form-submission` con reCAPTCHA, añadiendo el tipo de lead (firma, rancho, vivero, patrocinio).

## Orden de entrega

1. Sistema de diseño + Header/Footer (© 2026) + homepage nuevo.
2. `/inversion-de-impacto` y `/bonos-de-carbono` (lo que necesitas para el viaje).
3. `/vivero` (Espadín + Salmiana) y `/compensa`.
4. `/crowdgrowing` reubicado, FAQ por audiencia y SEO/sitemap.
