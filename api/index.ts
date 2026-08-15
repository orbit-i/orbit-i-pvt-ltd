import type { IncomingMessage, ServerResponse } from 'http';
import { createApp } from '../server.js';

// Vercel spins a fresh function instance per cold start — the Express app
// (and its in-memory db) is rebuilt then, and can be reused across warm
// invocations of the SAME instance only. It is NOT shared across instances
// or persisted between cold starts. This is fine for the current in-memory
// mock data, but it means data written via POST/PUT/PATCH will randomly
// disappear/reset in production. That's a placeholder limitation until a
// real datastore (Supabase) is wired in — see README-DEPLOY.md.
let appPromise: ReturnType<typeof createApp> | null = null;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!appPromise) {
    appPromise = createApp();
  }
  const app = await appPromise;
  return app(req, res);
}
