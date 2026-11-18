// Presentación de proyecciones con link único por destinatario: /proyecciones/<token>
// - Valida el token en Supabase (listas_compartidas con lista = 'proyecciones') y sirve el deck.
// - Registra aperturas, scroll, tiempo y uso del simulador en lista_eventos (misma tabla que /lista).
// - ?preview=1 no registra nada (para revisiones internas).

const SUPABASE = "https://ybhbceqthsfgsjccounm.supabase.co/rest/v1/rpc/";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaGJjZXF0aHNmZ3NqY2NvdW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNDM2NzgsImV4cCI6MjA2NDgxOTY3OH0.e-mHzlSFVzx6dCgMwMY-ynFw0l9yrbXYXdr1n1Uoh_M";
const H = { apikey: ANON, Authorization: `Bearer ${ANON}`, "Content-Type": "application/json" };

const FUENTE = "/proyecciones/9b38afea82ce/deck.html";
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

function rpc(fn: string, body: unknown) {
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

const NO_VALIDO = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Gavé</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F2F1EC;color:#15201E;font-family:system-ui,sans-serif;padding:16px;text-align:center}</style></head>
<body><div><p>Este link no es válido o ya no está vigente.</p><p style="color:#5B6865">Escríbenos a hectoreduardo@gaveagro.com</p></div></body></html>`;

const PARA_BOTS = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Gavé · Proyecciones 2027–2031</title><meta property="og:title" content="Gavé · Proyecciones 2027–2031">
<meta property="og:description" content="Agave regenerativo, trazable de la parcela a la botella · confidencial"></head><body></body></html>`;

function inyectar(html: string, nombre: string, token: string, registrar: boolean) {
  const n = esc(nombre);
  const wa = "https://wa.me/524444836582?text=" +
    encodeURIComponent("Hola Héctor, vi las proyecciones de Gavé y me gustaría platicar.");
  const head = `<style>
.gv-banda{position:sticky;top:0;z-index:20;background:#2E5C55;color:#F2F1EC;font:600 12px/1.4 Inter,system-ui,sans-serif;letter-spacing:.04em;text-align:center;padding:8px 16px}
.gv-cta{position:fixed;right:16px;bottom:16px;z-index:25;display:flex;gap:8px}
.gv-cta a{font:600 13px/1 Inter,system-ui,sans-serif;text-decoration:none;padding:12px 16px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.3)}
.gv-cta a.w{background:#D9933A;color:#15201E}.gv-cta a.m{background:#F2F1EC;color:#15201E}
body{padding-bottom:72px}
@media print{html,body{background:#fff!important}body>*{display:none!important}body::after{content:"Esta presentación es confidencial y no está disponible para imprimir. Escríbenos a hectoreduardo@gaveagro.com";display:block;padding:2in 1in;font:16px/1.5 Georgia,serif;color:#15201E;text-align:center}}
</style>`;
  const top = `<div class="gv-banda">Preparada para ${n} · confidencial</div>`;
  const cta = `<div class="gv-cta"><a class="w" data-t="whatsapp_boton" href="${wa}" target="_blank" rel="noopener">Platicar por WhatsApp</a><a class="m" data-t="correo_boton" href="mailto:hectoreduardo@gaveagro.com?subject=${encodeURIComponent("Proyecciones Gavé · " + nombre)}">Correo</a></div>`;
  const js = `<script>(function(){
var reg=${registrar ? "true" : "false"},u="/proyecciones/${token}/e";
function s(t,d){if(!reg)return;var b=JSON.stringify({tipo:t,detalle:d||null});try{if(navigator.sendBeacon&&navigator.sendBeacon(u,new Blob([b],{type:"text/plain"})))return}catch(e){}try{fetch(u,{method:"POST",body:b,keepalive:true})}catch(e){}}
window.__gaveLog=s;
document.addEventListener("contextmenu",function(e){e.preventDefault()});
document.addEventListener("keydown",function(e){var k=(e.key||"").toLowerCase();if((e.ctrlKey||e.metaKey)&&(k==="p"||k==="s")){e.preventDefault();s("imprimir",{tecla:k})}});
window.addEventListener("beforeprint",function(){s("imprimir",{via:"menu"})});
document.addEventListener("copy",function(e){e.preventDefault();s("copiar")});
document.addEventListener("click",function(e){var a=e.target.closest("[data-t]");if(a)s("click",{objetivo:a.getAttribute("data-t")})},true);
var sl=document.querySelectorAll(".sl"),vis={};if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var i=[].indexOf.call(sl,x.target)+1;if(!vis[i]){vis[i]=1;s("scroll",{lamina:i,pct:Math.round(100*i/sl.length)})}}})},{threshold:.6});sl.forEach(function(x){io.observe(x)})}
var sim=document.getElementById("simulador");if(sim&&"IntersectionObserver" in window){var v2=0;new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting&&!v2){v2=1;s("scroll",{lamina:"simulador",pct:100})}})},{threshold:.3}).observe(sim)}
var t0=Date.now();document.addEventListener("visibilitychange",function(){if(document.visibilityState==="hidden"){var x=Math.round((Date.now()-t0)/1000);if(x>2)s("tiempo",{segundos:x})}else t0=Date.now()});
})();</script>`;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>Gavé · Proyecciones 2027–2031 · ${n}</title>`)
    .replace("</head>", head + "</head>")
    .replace(/<body([^>]*)>/, `<body$1>${top}`)
    .replace("</body>", cta + js + "</body>");
}

export default async (req: Request, context: Ctx) => {
  const url = new URL(req.url);
  const m = url.pathname.match(/^\/proyecciones\/([a-f0-9]{32})(\/e)?\/?$/);
  if (!m) return new Response(NO_VALIDO, { status: 404, headers: HEADERS });
  const token = m[1];

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
  if (!d || !d.nombre || d.lista !== "proyecciones") return new Response(NO_VALIDO, { status: 404, headers: HEADERS });

  const src = await fetch(new URL(FUENTE, url.origin));
  if (!src.ok) return new Response(NO_VALIDO, { status: 404, headers: HEADERS });

  const registrar = !url.searchParams.has("preview");
  if (registrar) await log(token, "apertura", { ref: req.headers.get("referer") || null }, req, context);

  return new Response(inyectar(await src.text(), d.nombre, token, registrar), { headers: HEADERS });
};

export const config = { path: "/proyecciones/*", excludedPath: "/proyecciones/9b38afea82ce/*" };
