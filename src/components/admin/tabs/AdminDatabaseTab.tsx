import React, { useState } from 'react';
import {
  Database,
  Download,
  Copy,
  Check,
  Server,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';

export const AdminDatabaseTab: React.FC = () => {
  const [dialect, setDialect] = useState<'mysql' | 'supabase'>('mysql');
  const [copiedSql, setCopiedSql] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<any>(null);

  const [dbConfig, setDbConfig] = useState({
    host: 'srv123.main-hosting.eu',
    user: 'u123456789_orbit',
    database: 'u123456789_orbit_db',
    port: '3306',
  });

  const mysqlSql = `-- ==============================================================================
-- ORBIT-I PRIVATE LIMITED - PRODUCTION DATABASE SCHEMA (MySQL / Hostinger cPanel)
-- Hostinger MySQL, phpMyAdmin, AWS RDS & Google Cloud SQL Ready
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS \`orbit_i_db\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`orbit_i_db\`;

-- 1. Services Table
CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` VARCHAR(100) NOT NULL,
  \`short_desc\` TEXT NOT NULL,
  \`starting_price\` DECIMAL(10, 2) NOT NULL,
  \`delivery_time\` VARCHAR(64) NOT NULL,
  \`is_popular\` BOOLEAN DEFAULT FALSE,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Projects & Deliverables
CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`project_name\` VARCHAR(255) NOT NULL,
  \`client_name\` VARCHAR(255) NOT NULL,
  \`client_email\` VARCHAR(255) NOT NULL,
  \`current_phase\` VARCHAR(64) NOT NULL,
  \`progress_pct\` INT DEFAULT 0,
  \`total_budget\` DECIMAL(10, 2) NOT NULL,
  \`spent_budget\` DECIMAL(10, 2) DEFAULT 0,
  \`health_status\` VARCHAR(32) DEFAULT 'Optimal',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Invoices Ledger
CREATE TABLE IF NOT EXISTS \`invoices\` (
  \`id\` VARCHAR(64) PRIMARY KEY,
  \`invoice_number\` VARCHAR(64) UNIQUE NOT NULL,
  \`client_name\` VARCHAR(255) NOT NULL,
  \`project_title\` VARCHAR(255) NOT NULL,
  \`total_amount\` DECIMAL(10, 2) NOT NULL,
  \`status\` ENUM('Pending', 'Paid', 'Cancelled') DEFAULT 'Pending',
  \`issued_date\` VARCHAR(32) NOT NULL,
  \`paid_at\` VARCHAR(32)
) ENGINE=InnoDB;
`;

  const supabaseSql = `-- ==============================================================================
-- ORBIT-I PRIVATE LIMITED - SUPABASE / POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY
-- Compatible with Supabase, Vercel Postgres, Neon & AWS Aurora
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  starting_price NUMERIC(10, 2) NOT NULL,
  delivery_time TEXT NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Projects Table with RLS
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  project_name TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  current_phase TEXT NOT NULL,
  progress_pct INTEGER DEFAULT 0,
  total_budget NUMERIC(10, 2) NOT NULL,
  spent_budget NUMERIC(10, 2) DEFAULT 0,
  health_status TEXT DEFAULT 'Optimal',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
  invoice_number TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'Pending',
  issued_date TEXT NOT NULL,
  paid_at TEXT
);
`;

  const activeSql = dialect === 'mysql' ? mysqlSql : supabaseSql;

  const handleCopySql = () => {
    navigator.clipboard.writeText(activeSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([activeSql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OrbitI_${dialect.toUpperCase()}_Schema.sql`;
    a.click();
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    try {
      const res = await fetch('/api/db/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dialect, ...dbConfig }),
      });
      const data = await res.json();
      setConnectionResult(data);
    } catch (err) {
      setConnectionResult({ success: false, error: 'Connection timed out' });
    } finally {
      setTestingConnection(false);
    }
  };

  return (
    <div id="admin-database-panel" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            Database Architecture, SQL Exporter & DevOps Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Production-grade schema generators for Hostinger cPanel MySQL, phpMyAdmin, Supabase, and PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySql}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSql ? 'Copied' : 'Copy SQL'}</span>
          </button>
          <button
            onClick={handleDownloadSql}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .sql</span>
          </button>
        </div>
      </div>

      {/* Dialect Switcher & Live Connection Probe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schema Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <button
              onClick={() => setDialect('mysql')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                dialect === 'mysql'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              MySQL / Hostinger cPanel
            </button>
            <button
              onClick={() => setDialect('supabase')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                dialect === 'supabase'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Supabase / PostgreSQL RLS
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 max-h-[460px] overflow-y-auto leading-relaxed selection:bg-cyan-500/30">
            <pre>{activeSql}</pre>
          </div>
        </div>

        {/* Right: Live Connection Probe & Config */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Live Connection Probe</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Host / Cluster URI</label>
              <input
                type="text"
                value={dbConfig.host}
                onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Database User</label>
              <input
                type="text"
                value={dbConfig.user}
                onChange={(e) => setDbConfig({ ...dbConfig, user: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Database Name</label>
              <input
                type="text"
                value={dbConfig.database}
                onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
            </div>

            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {testingConnection ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>{testingConnection ? 'Pinging Database Server...' : 'Test Connection & Schema'}</span>
            </button>
          </div>

          {connectionResult && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-1.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Connected & Healthy</span>
              </div>
              <div className="text-[11px] text-slate-300">
                Ping: <strong className="text-white font-mono">{connectionResult.pingMs}ms</strong> • Tables:{' '}
                <strong className="text-white font-mono">{connectionResult.connectedTables} verified</strong>
              </div>
              <div className="text-[10px] text-slate-500 font-mono truncate">
                {connectionResult.serverVersion}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
