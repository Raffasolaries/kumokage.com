// Worker entrypoint (wrangler.jsonc "main"). Only the default export lives here; see edge.mjs.
import { handle } from "./edge.mjs";

const worker = { fetch: handle };

export default worker;
