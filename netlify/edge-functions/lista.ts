// Listas de precios Tajacú con link único por destinatario: /lista/<token>
// - Valida el token contra Supabase (tabla listas_compartidas) y sirve la lista que le toca.
// - Registra aperturas y eventos (clicks, scroll, tiempo, intentos de imprimir/copiar) con ubicación
//   aproximada a partir de la IP (geo de Netlify) en lista_eventos.
// - Sin botones de descarga; bloquea impresión y menú contextual (disuade, no impide capturas).
// - ?preview=1 no registra nada (para revisiones internas).

const SUPABASE = "https://ybhbceqthsfgsjccounm.supabase.co/rest/v1/rpc/";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaGJjZXF0aHNmZ3NqY2NvdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDM2NzgsImV4cCI6MjA2NDgxOTY3OH0.e-mHzlSFVzx6dCgMwMY-ynFw0l9yrbXYXdr1n1Uoh_M";
const H = { apikey: ANON, Authorization: `Bearer ${ANON}`, "Content-Type": "application/json" };

// Archivo fuente de cada lista (carpeta privada publicada en PR #5)
const FUENTE: Record<string, string> = {
  distribuidores: "/precios/zujhdawf4e9w/tajacu_lista_distribuidores.html",
  comercial_por_caja: "/precios/zujhdawf4e9w/tajacu_lista_comercial_por_caja.html",
  precios: "/precios/zujhdawf4e9w/tajacu_lista_precios.html",
  accionistas_serie_l: "/precios/zujhdawf4e9w/tajacu_lista_accionistas_serie_l.html",
};
const TIPOS = new Set(["click", "scroll", "tiempo", "imprimir", "copiar"]);
const BOT = /bot|crawler|spider|preview|facebookexternalhit|whatsapp|telegram|slack|discord|skype|linkedin|embedly|quora|pinterest|vkshare|google-|headless/i;

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
};

// deno-lint-ignore no-explicit-any
type Ctx = { ip?: string; geo?: any };

async function rpc(fn: string, body: unknown) {
  return fetch(SUPABASE + fn, { method: "POST", headers: H, body: JSON.stringify(body) });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function log(token: string, tipo: string, detalle: unknown, req: Request, ctx: Ctx) {
  const g = ctx.geo || {};
  return rpc("log_lista_evento", {
    p_token: token,
    p_tipo: tipo,
    p_detalle: detalle ?? null,
    p_ua: req.headers.get("user-agent") || null,
    p_ip: ctx.ip || null,
    p_ciudad: g.city || null,
    p_region: g.subdivision?.name || g.subdivision?.code || null,
    p_pais: g.country?.code || null,
  }).catch(() => {});
}

const NO_VALIDO = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Tajacú</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#EFE6DC;color:#26211D;font-family:system-ui,sans-serif;padding:16px;text-align:center}</style></head>
<body><div><p>Este link no es válido o ya no está vigente.</p><p style="color:#6E625A">Escríbenos a hectoreduardo@gaveagro.com</p></div></body></html>`;

const PARA_BOTS = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Tajacú · Lista de precios</title><meta property="og:title" content="Tajacú · Lista de precios">
<meta property="og:description" content="Mezcal artesanal · lista confidencial"></head><body></body></html>`;

function inyectar(html: string, nombre: string, token: string, registrar: boolean) {
  const n = esc(nombre);
  const wa = "https://wa.me/524444836582?text=" +
    encodeURIComponent("Hola Héctor, vi la lista de precios de Tajacú y me interesa hacer un pedido.");
  const head = `<meta name="robots" content="noindex, nofollow">
<style>
html,body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}
img{pointer-events:none;-webkit-user-drag:none}
.tj-banda{position:sticky;top:0;z-index:20;background:#26211D;color:#EFE6DC;font:500 12px/1.4 'Albert Sans',system-ui,sans-serif;letter-spacing:.04em;text-align:center;padding:8px 16px}
.tj-marca{position:fixed;inset:0;z-index:15;pointer-events:none;opacity:.05;background-image:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='340' height='220'><text x='20' y='130' transform='rotate(-24 170 110)' font-family='Georgia,serif' font-size='22' fill='#26211D'>${n} · confidencial</text></svg>`)}")}
.tj-cta{position:fixed;right:16px;bottom:16px;z-index:25;display:flex;gap:8px}
.tj-cta a{font:600 13px/1 'Albert Sans',system-ui,sans-serif;text-decoration:none;padding:12px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.18)}
.tj-cta a.w{background:#26211D;color:#EFE6DC}.tj-cta a.m{background:#F7F1EA;color:#26211D;border:1px solid #B98B6A}
.page .contact a,.page .contact a:visited{color:inherit;text-decoration:none}
body{padding-bottom:72px}
@media print{html,body{background:#fff!important}body>*{display:none!important}body::after{content:"Esta lista es confidencial y no está disponible para imprimir. Escríbenos a hectoreduardo@gaveagro.com";display:block;padding:2in 1in;font:16px/1.5 Georgia,serif;color:#26211D;text-align:center}}
</style>`;
  const top = `<div class="tj-banda">Preparada para ${n} · confidencial</div><div class="tj-marca" aria-hidden="true"></div>`;
  const cta = `<div class="tj-cta"><a class="w" data-t="whatsapp_boton" href="${wa}" target="_blank" rel="noopener">Hacer pedido por WhatsApp</a><a class="m" data-t="correo_boton" href="mailto:hectoreduardo@gaveagro.com?subject=${encodeURIComponent("Pedido Tajacú · " + nombre)}">Correo</a></div>`;
  const js = `<script>(function(){
var reg=${registrar ? "true" : "false"},u="/lista/${token}/e";
function s(t,d){if(!reg)return;var b=JSON.stringify({tipo:t,detalle:d||null});try{if(navigator.sendBeacon&&navigator.sendBeacon(u,new Blob([b],{type:"text/plain"})))return}catch(e){}try{fetch(u,{method:"POST",body:b,keepalive:true})}catch(e){}}
document.addEventListener("contextmenu",function(e){e.preventDefault()});
document.addEventListener("dragstart",function(e){e.preventDefault()});
document.addEventListener("keydown",function(e){var k=(e.key||"").toLowerCase();if((e.ctrlKey||e.metaKey)&&(k==="p"||k==="s")){e.preventDefault();s("imprimir",{tecla:k})}});
window.addEventListener("beforeprint",function(){s("imprimir",{via:"menu"})});
document.addEventListener("copy",function(e){e.preventDefault();s("copiar")});
document.addEventListener("click",function(e){var a=e.target.closest("[data-t]"),p=e.target.closest(".prod,tr,.cond,.chbox,section");
var d={};if(a)d.objetivo=a.getAttribute("data-t");var h=p&&p.querySelector("h3,td.n,h4,h2");if(h)d.seccion=h.textContent.trim().slice(0,60);
if(!d.objetivo&&!d.seccion)d.objetivo=(e.target.tagName||"").toLowerCase();s("click",d)},true);
var max=0,hit={};window.addEventListener("scroll",function(){var h=document.documentElement,p=Math.round(100*(h.scrollTop+innerHeight)/h.scrollHeight);if(p>max)max=p;
[25,50,75,100].forEach(function(m){if(max>=m-2&&!hit[m]){hit[m]=1;s("scroll",{pct:m})}})},{passive:true});
var t0=Date.now();document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){var x=Math.round((Date.now()-t0)/1000);if(x>2)s("tiempo",{segundos:x})}else t0=Date.now()});
})();</script>`;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>Tajacú · Lista de precios · ${n}</title>`)
    .replace("</head>", head + "</head>")
    .replace(/<body([^>]*)>/, `<body$1>${top}`)
    .replace(/<span>\+52 444 483 6582<\/span>/g, `<span><a data-t="whatsapp_portada" href="${wa}" target="_blank" rel="noopener">+52 444 483 6582</a></span>`)
    .replace(/<span>hectoreduardo@gaveagro\.com<\/span>/g, `<span><a data-t="correo_portada" href="mailto:hectoreduardo@gaveagro.com">hectoreduardo@gaveagro.com</a></span>`)
    .replace(/<span>www\.tajacu\.com<\/span>/g, `<span><a data-t="tajacu_com" href="https://www.tajacu.com" target="_blank" rel="noopener">www.tajacu.com</a></span>`)
    .replace("</body>", cta + js + "</body>");
}

export default async (req: Request, context: Ctx) => {
  const url = new URL(req.url);
  const m = url.pathname.match(/^\/lista\/([a-f0-9]{32})(\/e)?\/?$/);
  if (!m) return new Response(NO_VALIDO, { status: 404, headers: HEADERS });
  const token = m[1];

  // Eventos desde la página
  if (m[2]) {
    if (req.method !== "POST") return new Response(null, { status: 405 });
    try {
      const b = JSON.parse((await req.text()).slice(0, 2000));
      if (TIPOS.has(b.tipo)) await log(token, b.tipo, b.detalle ?? null, req, context);
    } catch (_) { /* ignorar */ }
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const ua = req.headers.get("user-agent") || "";
  if (BOT.test(ua)) return new Response(PARA_BOTS, { headers: HEADERS });

  const r = await rpc("get_lista_compartida", { p_token: token });
  const d = r.ok ? await r.json() : null;
  if (!d || !d.nombre || !FUENTE[d.lista]) return new Response(NO_VALIDO, { status: 404, headers: HEADERS });

  const src = await fetch(new URL(FUENTE[d.lista], url.origin));
  if (!src.ok) return new Response(NO_VALIDO, { status: 404, headers: HEADERS });

  const registrar = !url.searchParams.has("preview");
  if (registrar) await log(token, "apertura", { ref: req.headers.get("referer") || null }, req, context);

  return new Response(inyectar(await src.text(), d.nombre, token, registrar), { headers: HEADERS });
};

export const config = { path: "/lista/*" };
