import React, { useState, useEffect } from 'react';
import {
  Database,
  Download,
  Copy,
  Check,
  Activity,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw
} from 'lucide-react';

export const AdminDatabaseTab: React.FC = () => {
  const [copiedSql, setCopiedSql] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState<any>(null);
  const [sql, setSql] = useState('');
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    fetch('/api/export-db/mysql')
      .then((res) => res.text())
      .then(setSql)
      .catch(() => setSql('-- Failed to load schema from /api/export-db/mysql'));

    fetch('/api/health')
      .then((res) => res.json())
      .then(setHealth)
      .catch(() => {});
  }, []);

  const handleCopySql = () => {
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'OrbitI_MySQL_Schema.sql';
    a.click();
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    try {
      const res = await fetch('/api/db/test-connection', { method: 'POST' });
      const data = await res.json();
      setConnectionResult(data);
    } catch (err) {
      setConnectionResult({ success: false, error: 'Request failed' });
    } finally {
      setTestingConnection(false);
    }
  };

  const isConfigured = health?.hosting?.mysql === 'Connected';

  return (
    <div id="admin-database-panel" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" />
            Database Schema & Connection Status
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Live schema and connection state for the MySQL database this app actually runs on.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schema Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 max-h-[460px] overflow-y-auto leading-relaxed selection:bg-cyan-500/30">
            <pre>{sql || 'Loading schema…'}</pre>
          </div>
        </div>

        {/* Right: Live Connection Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Connection Status</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className={`p-3 rounded-lg border flex items-center gap-2 ${
              isConfigured
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-amber-950/40 border-amber-800 text-amber-300'
            }`}>
              {isConfigured ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
              <span>{health?.hosting?.mysql || 'Checking…'}</span>
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              Connection is configured via <code className="text-slate-300">DB_HOST</code>,{' '}
              <code className="text-slate-300">DB_USER</code>, <code className="text-slate-300">DB_PASSWORD</code>,{' '}
              <code className="text-slate-300">DB_NAME</code> environment variables on the server — not editable from here.
            </p>

            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >
              {testingConnection ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              <span>{testingConnection ? 'Pinging Database…' : 'Test Connection'}</span>
            </button>
          </div>

          {connectionResult && (
            <div className={`p-3.5 rounded-xl bg-slate-950 border text-xs space-y-1.5 animate-fadeIn ${
              connectionResult.success ? 'border-emerald-500/30' : 'border-red-500/30'
            }`}>
              <div className={`flex items-center gap-1.5 font-bold ${connectionResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {connectionResult.success ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{connectionResult.success ? 'Connected & Healthy' : 'Connection Failed'}</span>
              </div>
              {connectionResult.success ? (
                <div className="text-[11px] text-slate-300">
                  Ping: <strong className="text-white font-mono">{connectionResult.pingMs}ms</strong> • Tables:{' '}
                  <strong className="text-white font-mono">{connectionResult.connectedTables} verified</strong>
                </div>
              ) : (
                <div className="text-[11px] text-slate-400">{connectionResult.error}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
