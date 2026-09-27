import mysql from 'mysql2/promise';

// ==========================================
// CONNECTION POOL
// ==========================================
// Small pool size — this app runs as a Vercel serverless function, where
// each instance should hold only a few connections at a time, not a large
// long-lived pool like a traditional always-on server would use.
let pool: mysql.Pool | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}

function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      // MySQL JSON columns come back as JS objects already with mysql2 — no
      // need to JSON.parse/stringify manually on the read path.
    });
  }
  return pool;
}

// Tables that store one row per item, addressed by `id`, with the full item
// serialized into a JSON column. This is a deliberate simplification: several
// of the app's TypeScript types (ClientProject, InvoiceItem, SupportTicket)
// have messy/inconsistent optional fields and deeply nested arrays. Rather
// than force those into a brittle fully-normalized column-per-field schema
// (high risk of silently dropping fields), each row gets real MySQL
// durability, a real primary key, and real per-row CRUD, while the shape of
// the data stays exactly what the TypeScript types already say it is.
const ROW_TABLES = ['leads', 'applications', 'projects', 'invoices', 'tickets', 'audit_logs'] as const;
export type RowTable = (typeof ROW_TABLES)[number];

// Content resources that the app always replaces wholesale (see PUT
// /api/content/:resource) — a single JSON blob per resource key is the
// correct shape for that access pattern, not a shortcut.
const CONTENT_KEYS = ['settings', 'services', 'products', 'blogs', 'careers', 'gallery', 'caseStudies', 'partners'] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

// ==========================================
// SCHEMA
// ==========================================
export async function initSchema(): Promise<void> {
  const p = getPool();

  await p.query(`
    CREATE TABLE IF NOT EXISTS content_store (
      resource_key VARCHAR(50) PRIMARY KEY,
      data JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  for (const table of ROW_TABLES) {
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`${table}\` (
        id VARCHAR(64) PRIMARY KEY,
        data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  }
}

// ==========================================
// CONTENT STORE (settings / services / products / blogs / careers / gallery / caseStudies)
// ==========================================
export async function getContent<T = any>(key: ContentKey): Promise<T | null> {
  const p = getPool();
  const [rows] = await p.query('SELECT data FROM content_store WHERE resource_key = ?', [key]);
  const arr = rows as Array<{ data: any }>;
  if (arr.length === 0) return null;
  return arr[0].data as T;
}

export async function setContent(key: ContentKey, value: any): Promise<void> {
  const p = getPool();
  await p.query(
    'INSERT INTO content_store (resource_key, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)',
    [key, JSON.stringify(value)]
  );
}

// ==========================================
// GENERIC ROW TABLES (leads, applications, projects, invoices, tickets, audit_logs)
// ==========================================
export async function listRows<T = any>(table: RowTable): Promise<T[]> {
  const p = getPool();
  const [rows] = await p.query(`SELECT data FROM \`${table}\` ORDER BY created_at DESC`);
  return (rows as Array<{ data: any }>).map((r) => r.data as T);
}

export async function upsertRow(table: RowTable, id: string, data: any): Promise<void> {
  const p = getPool();
  await p.query(
    `INSERT INTO \`${table}\` (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [id, JSON.stringify(data)]
  );
}

export async function deleteRow(table: RowTable, id: string): Promise<void> {
  const p = getPool();
  await p.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
}

export async function replaceAllRows(table: RowTable, items: Array<{ id: string }>): Promise<void> {
  const p = getPool();
  const conn = await p.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(`DELETE FROM \`${table}\``);
    for (const item of items) {
      await conn.query(`INSERT INTO \`${table}\` (id, data) VALUES (?, ?)`, [item.id, JSON.stringify(item)]);
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

export { CONTENT_KEYS, ROW_TABLES };
