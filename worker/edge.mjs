// kumokage.com edge logic, imported by index.mjs (workerd treats every named export of the
// main module as an entrypoint, so constants and helpers live here). The static export in ./out
// is served through the ASSETS binding; the Worker runs first (assets.run_worker_first) to add
// what static files cannot:
//   www.kumokage.com/*  → 301 https://kumokage.com/*
//   /                   → 302 /en | /de | /it, chosen from Accept-Language
//   every response      → security headers; immutable caching for hashed /_next/static/ files
// Legacy paths kept for the Google OAuth app: /privacy, /workspace-mcp, /logo.svg (plain assets).

export const CANONICAL_HOST = "kumokage.com";
export const LOCALES = ["en", "de", "it"];
export const DEFAULT_LOCALE = "en";

export const SECURITY_HEADERS = {
  "strict-transport-security": "max-age=31536000",
  "x-content-type-options": "nosniff",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-frame-options": "DENY",
  "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  // Next.js static export inlines its bootstrap scripts and styles, hence 'unsafe-inline'; nothing loads from third parties.
  "content-security-policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; " +
    "font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
};

/** Picks en/de/it from an Accept-Language header, honouring q-values; English by default. */
export function pickLocale(acceptLanguage) {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.slice(2)) : 1, index };
    })
    .filter((entry) => entry.lang && Number.isFinite(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const match = ranked.find((entry) => LOCALES.includes(entry.lang));
  return match ? match.lang : DEFAULT_LOCALE;
}

function withHeaders(response, extra = {}) {
  const res = new Response(response.body, response);
  for (const [name, value] of Object.entries({ ...SECURITY_HEADERS, ...extra })) res.headers.set(name, value);
  return res;
}

export async function handle(request, env) {
  const url = new URL(request.url);

  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    return Response.redirect(url.toString(), 301);
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return withHeaders(
      new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD", "content-type": "text/plain; charset=utf-8" } }),
    );
  }

  if (url.pathname === "/" || url.pathname === "/index.html") {
    const locale = pickLocale(request.headers.get("accept-language"));
    return withHeaders(
      new Response(null, {
        status: 302,
        headers: { location: `/${locale}`, "cache-control": "private, no-store", vary: "Accept-Language" },
      }),
    );
  }

  const response = await env.ASSETS.fetch(request);
  if (response.ok && url.pathname.startsWith("/_next/static/")) {
    return withHeaders(response, { "cache-control": "public, max-age=31536000, immutable" });
  }
  return withHeaders(response);
}
