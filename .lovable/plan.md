## Objetivo

Conectar Google Search Console (GSC) al proyecto, verificar la propiedad de `https://gaveagro.com/` mediante meta-tag, y enviar el sitemap para iniciar la indexación.

## Pasos

1. **Conectar GSC vía OAuth**
   - Lanzar el selector de conexiones para el conector `google_search_console`. Tú autorizas con la cuenta Google que administre `gaveagro.com`.

2. **Generar token de verificación META**
   - Llamar al endpoint `/siteVerification/v1/token` para obtener el `<meta name="google-site-verification" content="...">` correspondiente a `https://gaveagro.com/`.

3. **Insertar el meta-tag en `index.html`**
   - Añadir la etiqueta dentro de `<head>`, junto a los demás meta tags existentes. Es estática (server-rendered por Vite), por lo que Google podrá leerla.

4. **Publicar el sitio**
   - Necesitas hacer Publish para que la nueva versión de `index.html` quede disponible en `gaveagro.com`. Sin republicar, Google no encontrará el tag y la verificación fallará.

5. **Ejecutar verificación**
   - Llamar a `/siteVerification/v1/webResource?verificationMethod=META`. Si responde 200 → propiedad verificada.

6. **Registrar el sitio en Search Console**
   - PUT a `/webmasters/v3/sites/https%3A%2F%2Fgaveagro.com%2F` para que aparezca en tu lista de propiedades.

7. **Enviar el sitemap**
   - PUT a `/webmasters/v3/sites/.../sitemaps/https%3A%2F%2Fgaveagro.com%2Fsitemap.xml` para que Google lo procese (el archivo ya existe en `public/sitemap.xml`).

8. **Marcar el finding `gsc:gsc` como resuelto** en el panel SEO.

## Detalles técnicos

- Dominio a verificar: `https://gaveagro.com/` (no el dominio `*.lovable.app`, ya que tu sitio en producción corre bajo el dominio personalizado en Netlify).
- Método de verificación: META tag (único viable sin acceso a DNS/archivo del servidor).
- El meta-tag queda permanente en `index.html`; no eliminarlo después, GSC lo re-verifica periódicamente.
- Datos de búsqueda (impresiones, clics, queries) tardan ~2-3 días en aparecer tras la verificación.

## Requisitos previos

- Tener acceso de administrador a la cuenta Google que vas a usar (idealmente la misma cuenta corporativa de Gavé).
- Estar listo para hacer **Publish** entre los pasos 3 y 5.

## Lo que NO incluye este plan

- Configuración de Google Analytics 4 (ya está integrado).
- Verificación del subdominio `id-preview--*.lovable.app` ni `gave-agave-growth.lovable.app` (no aporta valor SEO).
- Envío de URLs individuales para indexación express (lo hace GSC automáticamente vía sitemap).
