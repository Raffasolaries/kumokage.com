# kumokage.com

Website of Kumokage GmbH, Zürich: <https://kumokage.com>.

## Stack

- Next.js 16 static export in English, German and Italian (`next-intl`), Tailwind CSS 4, IBM Plex from the Fontsource npm packages through `next/font/local`: neither the build nor visitors contact Google Fonts. The site loads nothing from third parties.
- Served by the Cloudflare Worker `kumokage-site` with static assets (`wrangler.jsonc`). The Worker in `worker/` runs before the assets and adds what static files can't:
  - `www.kumokage.com/*` → 301 to `https://kumokage.com/*`
  - `/` → 302 to `/en`, `/de` or `/it`, picked from `Accept-Language`
  - security headers (CSP, HSTS, `nosniff`, frame denial) on every response, and immutable caching for hashed `/_next/static/` files
- Brand: Washi `#F6F4EF`, Sumi ink `#212832`, Kage slate `#4E5D6C`, Aizome indigo `#2F5D8A`; the designer's mark (Wolke F) in `public/kumokage-mark.svg`.

## Develop

```bash
npm ci
npm run dev        # Next.js dev server on :3000
npm run lint
npm test           # Worker unit tests (node:test)
npm run build      # static export to out/
npx wrangler dev   # out/ served through the Worker on :8787, as in production
```

## Deploy

`.github/workflows/site.yml` builds, lints, tests and dry-runs `wrangler deploy` on every pull request. On every push to `main` it deploys with `wrangler deploy` through the GitHub environment `production`, then smoke-tests the live URLs.

| Setting | Where | Value |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | environment `production` secret | Token with *Workers Scripts: Edit* on the account and DNS edit on the `kumokage.com` zone (custom domains). It's currently the devplatform-infra token; replace it with a dedicated, narrower token when convenient. |
| `CLOUDFLARE_ACCOUNT_ID` | environment `production` variable | `233c1afe9c1ae00e108d868eb9e0d69d` |

The Worker owns the custom domains `kumokage.com` and `www.kumokage.com`; wrangler creates the DNS records and certificates.

## Pages and fixed paths

| Path | What it is |
|---|---|
| `/en`, `/de`, `/it` | Company home page |
| `/{locale}/legal` | Legal notice (Impressum) and privacy notice for the website |
| `/privacy` | Privacy policy of the **Workspace MCP Servers** Google OAuth app (English). Google Auth Platform branding points here: keep the path and the wording. |
| `/workspace-mcp` | Description of the Workspace MCP Servers app (English) |
| `/Kumokage-Capability-Statement.pdf` | Two-page capability statement (English) |
| `/logo.svg` | Logo at the path the former home page used |

## Content rules

- Every public claim must be traceable to the fact register of the Kumokage launch kit. Current clients are described, never named; no pricing or internal go-to-market content.
- AWS first. Microsoft Azure, Google Cloud and Alibaba Cloud appear only as *planned* until a certification or delivered engagement backs each one.
- Working languages are English and Italian (the German pages are a courtesy). No phone number on this site.
- Credentials: four AWS certifications plus two AWS badges, linked by their canonical Credly IDs in `src/lib/credentials.ts`. Company facts (UID, register, address) live in `src/lib/site.ts`; all copy in `src/messages/{en,de,it}.json`.
- To update the capability statement, replace `public/Kumokage-Capability-Statement.pdf`; its Typst source is in the launch kit, and a copy is in the Kumokage shared drive.

## History

Until 23 October 2026 the same Worker was a one-file Worker managed by Terraform in `workstation-setup` (`terraform/devplatform/stacks/infra/kumokage-site.tf`). That stack now only *forgets* it (`removed` blocks), so this repository is its single owner.
