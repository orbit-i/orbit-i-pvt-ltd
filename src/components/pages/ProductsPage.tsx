import React, { useState } from 'react';
import { ProductItem, NavigationTab } from '../../types';
import {
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Terminal
} from 'lucide-react';

interface ProductsPageProps {
  products?: ProductItem[];
  setActiveTab: (tab: NavigationTab) => void;
  onBuyProduct: (product: ProductItem) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products = [],
  setActiveTab,
  onBuyProduct,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proprietary SaaS & Developer Tools</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Orbit-I Autonomous Products
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Turnkey AI suites, automated Python workflow engines, and security scanners engineered by Orbit-I Private Limited.
        </p>

        {/* Billing Cycle Switch */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-800 p-1 transition-colors relative cursor-pointer"
          >
            <div
              className={`w-4 h-4 rounded-full bg-blue-500 transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              Annual Billing
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              Save 20%
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(products || []).map((prod) => {
          const price = billingCycle === 'annual' ? Math.round(prod.annualPrice / 12) : prod.monthlyPrice;

          return (
            <div
              key={prod.id}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
                      {prod.category} • {prod.version}
                    </span>
                    <h2 className="text-2xl font-bold text-white mt-1">{prod.name}</h2>
                    <p className="text-xs text-slate-300 font-medium">{prod.tagline}</p>
                  </div>
                  {prod.badge && (
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/40 text-xs font-bold">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {prod.description}
                </p>

                {/* Telemetry Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  {(prod.metrics || []).map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-extrabold text-cyan-400">{m.value}</div>
                      <div className="text-[10px] text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feature List */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Key Capabilities:</div>
                  {(prod.features || []).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">
                    {billingCycle === 'annual' ? 'Billed Annually' : 'Billed Monthly'}
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    ${price}{' '}
                    <span className="text-xs font-normal text-slate-400">/ mo</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onBuyProduct(prod)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    Subscribe & Deploy
                  </button>
                  <button
                    onClick={() => setActiveDemo(activeDemo === prod.id ? null : prod.id)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    {activeDemo === prod.id ? 'Close Tour' : 'Feature Tour'}
                  </button>
                </div>
              </div>

              {/* Interactive Demo Tour Drawer */}
              {activeDemo === prod.id && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span>Live Architecture & Sandbox Preview:</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                    {`# Quick Start SDK integration for ${prod.name}
npm install @orbit-i/${prod.id}
import { createOrbitClient } from '@orbit-i/${prod.id}';

const client = createOrbitClient({
  apiKey: process.env.ORBIT_I_API_KEY,
  environment: 'production'
});
await client.syncWithDatabase({ dialect: 'mysql_hostinger' });`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
