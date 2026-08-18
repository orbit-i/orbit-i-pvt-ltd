import type { IncomingMessage, ServerResponse } from 'http';
import { createApp } from '../server.js';

// Vercel spins a fresh function instance per cold start. createApp() connects
// to MySQL and loads persisted data into the in-memory mirror on each cold
// start, and reuses that same connection/state across warm invocations of
// the SAME instance. Data written via POST/PUT/PATCH is durably persisted to
// MySQL (see db.ts), so it survives across cold starts and instances too —
// unlike a pure in-memory store would.
let appPromise: ReturnType<typeof createApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!appPromise) {
    appPromise = createApp();
  }
  const app = await appPromise;
  return app(req, res);
}
