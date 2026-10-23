# CLAUDE.md — kumokage.com

Company website of Kumokage GmbH. See `README.md` for the stack, commands and deployment.

## Rules for changes

- Content lives in `src/messages/{en,de,it}.json`; change all three languages together. German uses Swiss spelling ("ss", 12’000).
- Every claim must match the Kumokage fact register; never name current clients, never publish pricing, never present Azure, Google Cloud or Alibaba Cloud as current offers.
- No phone number, no analytics, no cookies, no third-party requests (the CSP in `worker/edge.mjs` enforces `'self'`).
- `/privacy` and `/workspace-mcp` are referenced by the Google OAuth app: keep the paths, and change the policy wording only together with Google Auth Platform.
- Keep the Worker entrypoint `worker/index.mjs` to a single default export: workerd treats named exports as entrypoints. Helpers go in `worker/edge.mjs`, with tests in `worker/edge.test.mjs`.
- Before pushing: `npm run lint && npm test && npm run build`.
