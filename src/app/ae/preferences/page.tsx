"use client";

import { Save, ShieldAlert, Target, DollarSign, Crosshair, Building } from "lucide-react";

export default function AEPreferences() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-800/80 bg-zinc-950 px-8 py-8 flex items-center justify-between z-10">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-white">Career Guardrails</h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">Define the strict boundaries for opportunities that reach your inbox.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-4 py-2 rounded-md transition-colors text-sm flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Guardrails
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl space-y-12 pb-20">

          {/* Strict Mode Toggle Alert */}
          <div className="flex items-start gap-4 p-5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <ShieldAlert className="w-6 h-6 text-emerald-500 flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold font-heading text-lg">Strict Mode Enabled</h3>
                <div className="w-10 h-6 bg-emerald-500 rounded-full flex items-center px-1 cursor-pointer">
                  <div className="w-4 h-4 bg-zinc-950 rounded-full translate-x-4 shadow-sm" />
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Companies whose operational metrics fall below your exact financial minimums will be automatically blocked from initiating contact. You will only see opportunities matching this criteria.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            
            {/* Financials Column */}
            <div className="space-y-8">
              <h2 className="text-xl font-heading font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <DollarSign className="w-5 h-5 text-slate-500" /> Economic Minimums
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase">Absolute Minimum Base</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                    <input type="text" defaultValue="150,000" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-7 pr-4 py-3 focus:border-emerald-500 focus:outline-none transition-all text-lg" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase">Absolute Minimum Target OTE</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                    <input type="text" defaultValue="300,000" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-7 pr-4 py-3 focus:border-emerald-500 focus:outline-none transition-all text-lg" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase">Min Team Quota Attainment</label>
                  <div className="relative">
                    <input type="text" defaultValue="50" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-8 py-3 focus:border-emerald-500 focus:outline-none transition-all text-lg" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">%</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Auto-reject orgs where &lt;50% of the team is hitting quota.</p>
                </div>
              </div>
            </div>

            {/* Operational Motion Column */}
            <div className="space-y-8">
              <h2 className="text-xl font-heading font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Crosshair className="w-5 h-5 text-slate-500" /> Operational Motion
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-400 uppercase">Target Segment</label>
                  <div className="space-y-2 mt-2">
                    {["Enterprise (ACV $100k+)", "Mid-Market (ACV $25k-$100k)", "SMB / Velocity (ACV <$25k)"].map((seg, i) => (
                      <label key={seg} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${i === 0 ? 'bg-emerald-600 border-emerald-500' : 'border-slate-700 bg-zinc-950 group-hover:border-slate-500'}`}>
                          {i === 0 && <div className="w-2 h-2 bg-white rounded-sm" />}
                        </div>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{seg}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <label className="text-xs font-mono text-slate-400 uppercase">Tolerable Sales Cycle Length</label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative flex-1">
                      <input type="text" defaultValue="90" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-12 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">Days (Min)</span>
                    </div>
                    <span className="text-slate-600">-</span>
                    <div className="relative flex-1">
                      <input type="text" defaultValue="180" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-12 py-2 focus:border-emerald-500 focus:outline-none transition-all" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">Days (Max)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}
