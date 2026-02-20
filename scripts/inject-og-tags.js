import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const distDir = resolve(process.cwd(), 'dist');

const pages = [
  {
    path: 'hijuelos-espadin',
    title: 'Hijuelos de Agave Espadín — Gavé Agrotecnología',
    description: 'Hijuelos de Agave Espadín certificados desde la Huasteca Potosina. Asesoría técnica, logística y registro ante el CRM incluidos. Cotiza hoy.',
    image: 'https://gaveagro.com/images/especies-de-agave-para-mezcal-gavé.jpg',
    url: 'https://gaveagro.com/hijuelos-espadin',
  },
];

const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');

for (const page of pages) {
  const ogTags = `
    <meta property="og:title" content="${page.title}" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:image" content="${page.image}" />
    <meta property="og:url" content="${page.url}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_MX" />
    <meta property="og:site_name" content="Gavé Agrotecnología" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${page.title}" />
    <meta name="twitter:description" content="${page.description}" />
    <meta name="twitter:image" content="${page.image}" />
    <title>${page.title}</title>
    <meta name="description" content="${page.description}" />`;

  // Replace the default <title> and inject OG tags before </head>
  const modifiedHtml = baseHtml
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${ogTags}\n  </head>`);

  const outputPath = resolve(distDir, `${page.path}.html`);
  writeFileSync(outputPath, modifiedHtml, 'utf-8');
  console.log(`✅ Generated ${page.path}.html with OG tags`);
}
