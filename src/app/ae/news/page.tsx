"use client";

import { Newspaper, TrendingUp, Zap, Users, ArrowUpRight } from "lucide-react";

export default function AENews() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-800/80 bg-zinc-950 px-8 py-8 flex items-center justify-between z-10">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-white">Market Intelligence</h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">Curated signals affecting Enterprise GTM teams.</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8 pb-20">

          {/* Signal Item 1 */}
          <div className="bg-zinc-900 border border-slate-800 rounded-lg p-6 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Funding Alert</span>
                  <span className="text-xs font-mono text-slate-500">2 hours ago</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  Ramp raises $150M Series D at $7.6B Valuation 
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  The spend management platform plans to aggressively expand its mid-market and enterprise sales motion over the next 12 months. Expect significant headcount expansion in strategic AE roles.
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Fintech</span>
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Series D</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signal Item 2 */}
          <div className="bg-zinc-900 border border-slate-800 rounded-lg p-6 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Leadership Change</span>
                  <span className="text-xs font-mono text-slate-500">Yesterday</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  Notion hires former Salesforce VP as Global Head of Sales
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Signal of a strong shift upmarket. The new leadership implies a likely transition toward more rigid enterprise methodologies like MEDDPICC and an increase in outbound focus.
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Productivity</span>
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Enterprise Push</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signal Item 3 */}
          <div className="bg-zinc-900 border border-slate-800 rounded-lg p-6 group hover:border-emerald-500/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Market Shift</span>
                  <span className="text-xs font-mono text-slate-500">Oct 28</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                  Cybersecurity budgets increasing by 22% in Q1
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Gartner reports a massive impending increase in enterprise security spending. Cybersecurity AEs may see reduced sales cycles and higher multi-year contract velocity in the coming quarters.
                </p>
                <div className="flex items-center gap-3">
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Macro Trend</span>
                  <span className="bg-zinc-950 border border-slate-800 text-slate-400 text-xs px-2 py-1 rounded font-mono">Cybersecurity</span>
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
