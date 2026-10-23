import assert from "node:assert/strict";
import { test } from "node:test";
import worker from "./index.mjs";
import { pickLocale, SECURITY_HEADERS } from "./edge.mjs";

const assets = {
  async fetch(request) {
    const { pathname } = new URL(request.url);
    if (pathname === "/en" || pathname === "/privacy" || pathname.startsWith("/_next/static/")) {
      return new Response("ok", { status: 200, headers: { "content-type": "text/html" } });
    }
    return new Response("not found", { status: 404 });
  },
};

const get = (url, headers = {}, method = "GET") => worker.fetch(new Request(url, { method, headers }), { ASSETS: assets });

test("pickLocale honours order and q-values", () => {
  assert.equal(pickLocale(null), "en");
  assert.equal(pickLocale("de-CH,de;q=0.9,en;q=0.8"), "de");
  assert.equal(pickLocale("it-CH"), "it");
  assert.equal(pickLocale("fr-CH,fr;q=0.9,it;q=0.7,en;q=0.6"), "it");
  assert.equal(pickLocale("en;q=0.5,de;q=0.9"), "de");
  assert.equal(pickLocale("fr-CH,fr"), "en");
  assert.equal(pickLocale("de;q=0,it"), "it");
});

test("www redirects to the apex with the path and query", async () => {
  const res = await get("https://www.kumokage.com/de/legal?x=1");
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://kumokage.com/de/legal?x=1");
});

test("root redirects to the visitor's language without caching", async () => {
  const res = await get("https://kumokage.com/", { "accept-language": "de-CH,de;q=0.9" });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "/de");
  assert.equal(res.headers.get("vary"), "Accept-Language");
  assert.equal(res.headers.get("cache-control"), "private, no-store");
});

test("assets get security headers; hashed files are immutable", async () => {
  const page = await get("https://kumokage.com/privacy");
  assert.equal(page.status, 200);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) assert.equal(page.headers.get(name), value);
  const asset = await get("https://kumokage.com/_next/static/chunks/app.js");
  assert.equal(asset.headers.get("cache-control"), "public, max-age=31536000, immutable");
  const missing = await get("https://kumokage.com/nope");
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get("x-content-type-options"), "nosniff");
});

test("only GET and HEAD are allowed", async () => {
  const res = await get("https://kumokage.com/en", {}, "POST");
  assert.equal(res.status, 405);
  assert.equal(res.headers.get("allow"), "GET, HEAD");
});
