import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';

// ==========================================
// JWT SECRET
// ==========================================
// Falls back to a random secret generated at boot if JWT_SECRET isn't set,
// so the app doesn't crash — but tokens won't survive a restart/cold start
// in that case (everyone gets logged out). Set JWT_SECRET in production.
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.JWT_SECRET) {
  console.warn(
    '[security] JWT_SECRET is not set — using a random secret generated at boot. ' +
    'Every cold start invalidates all existing sessions. Set JWT_SECRET in your environment for stable sessions.'
  );
}

export interface AuthTokenPayload {
  role: 'superadmin' | 'client';
  email: string;
  projectId?: string;
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
}

export function verifyToken(token: string): AuthTokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
  } catch {
    return null;
  }
}

function getBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.slice(7);
}

// Requires a valid token for ANY authenticated role (admin or client).
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  (req as any).auth = payload;
  next();
}

// Requires a valid token AND the superadmin role specifically.
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = getBearerToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  if (payload.role !== 'superadmin') {
    return res.status(403).json({ error: 'SuperAdmin access required.' });
  }
  (req as any).auth = payload;
  next();
}

// ==========================================
// PASSWORD COMPARISON (constant-time, avoids timing attacks)
// ==========================================
export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// ==========================================
// RATE LIMITING
// ==========================================
// Strict limiter for auth endpoints — the actual brute-force/dictionary
// attack defense. 8 attempts per 15 minutes per IP.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Try again in 15 minutes.' },
});

// General limiter for all other API routes — blunts scripted abuse and
// basic denial-of-service attempts at the application layer. Real
// large-scale DDoS mitigation happens at Vercel's edge network, not here.
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Slow down.' },
});

// Tighter limiter for public write endpoints (lead/application submission)
// to slow down spam/scraper abuse without blocking genuine visitors.
export const writeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions. Try again later.' },
});
