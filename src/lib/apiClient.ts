// Central place for the session's auth token. The backend now actually
// enforces authentication on admin/client routes (see server.ts) — this
// module makes sure the frontend actually sends the token it gets back
// from login, since previously nothing did and the "security" was purely
// the UI not showing admin buttons.
const TOKEN_KEY = 'orbit_auth_token';

let authToken: string | null = null;
try {
  authToken = sessionStorage.getItem(TOKEN_KEY);
} catch {
  // sessionStorage unavailable (SSR/private mode edge cases) — fall back to in-memory only
}

export function setAuthToken(token: string | null): void {
  authToken = token;
  try {
    if (token) sessionStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore storage errors
  }
}

export function getAuthToken(): string | null {
  return authToken;
}

// Drop-in replacement for fetch() against our own /api/* routes — attaches
// the bearer token automatically. Use this instead of raw fetch() for any
// call to our backend.
export async function apiFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }
  const res = await fetch(input, { ...init, headers });
  if (res.status === 401) {
    // Token missing/expired/invalid — clear it so the UI can react (e.g. bounce to login).
    setAuthToken(null);
  }
  return res;
}
