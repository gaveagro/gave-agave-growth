import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const distDir = resolve(process.cwd(), 'dist');

const pages = [
  {
    path: 'hijuelos-espadin',
    lang: 'es',
    locale: 'es_MX',
    title: 'Hijuelos de Agave Espadín — Gavé Agrotecnología',
    description: 'Hijuelos de Agave Espadín certificados desde la Huasteca Potosina. Asesoría técnica, logística y registro ante el CRM incluidos. Cotiza hoy.',
    image: 'https://gaveagro.com/images/especies-de-agave-para-mezcal-gav%C3%A9.jpg',
    url: 'https://gaveagro.com/hijuelos-espadin',
  },
];

const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

for (const page of pages) {
  const ogTags = `
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${page.url}" />
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${page.image}" />
    <meta property="og:image:secure_url" content="${page.image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="${page.locale}" />
    <meta property="og:site_name" content="Gavé Agrotecnología" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${page.image}" />`;

  // Strip ALL existing title, description, canonical, og:* and twitter:* tags
  // so WhatsApp/Facebook crawlers don't pick the first (default) tags.
  let modifiedHtml = baseHtml
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');

  // Update <html lang="..."> so crawlers detect Spanish
  modifiedHtml = modifiedHtml.replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${page.lang}"`);

  modifiedHtml = modifiedHtml.replace('</head>', `${ogTags}\n  </head>`);

  const outputPath = resolve(distDir, `${page.path}.html`);
  writeFileSync(outputPath, modifiedHtml, 'utf-8');
  console.log(`✅ Generated ${page.path}.html with clean OG tags`);
}
