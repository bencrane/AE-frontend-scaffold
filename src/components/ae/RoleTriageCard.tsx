"use client";

import { Building2, ChevronRight, CheckCircle2, Bookmark } from "lucide-react";
import { Role } from "@/lib/mock-roles";

interface Props {
  role: Role;
}

export function RoleTriageCard({ role }: Props) {
  return (
    <div className="h-full bg-zinc-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-colors">
      <div className="p-5 flex flex-col gap-5 h-full">
        
        {/* Header: Identity & Topline */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1 min-w-0 pr-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-950 border border-slate-800 flex items-center justify-center flex-shrink-0 text-slate-500">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-heading font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                {role.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm font-mono text-slate-400 truncate">
                <span className="text-slate-300 font-medium">{role.companyName}</span>
                <span className="text-slate-600">•</span>
                <span>{role.companyStage}</span>
                <span className="text-slate-600">•</span>
                <span>{role.companySector}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-2 flex-shrink-0">
            <button className="text-slate-500 hover:text-white p-2 transition-colors mt-0.5">
              <Bookmark className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-mono text-emerald-400 font-semibold leading-none">
                ${(role.metrics.targetOte / 1000).toFixed(0)}k
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
                Target OTE
              </span>
            </div>
          </div>
        </div>

        {/* Dense Metrics Grid */}
        <div className="grid grid-cols-4 gap-4 py-4 border-y border-slate-800/80">
          <div className="space-y-1 overflow-hidden">
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-widest truncate">Base</p>
            <p className="text-sm font-mono text-slate-200 truncate">${(role.metrics.base / 1000).toFixed(0)}k</p>
          </div>
          <div className="space-y-1 overflow-hidden">
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-widest truncate">Avg Deal</p>
            <p className="text-sm font-mono text-slate-200 truncate">${(role.metrics.avgDealSize / 1000).toFixed(0)}k</p>
          </div>
          <div className="space-y-1 overflow-hidden">
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-widest truncate">Cycle</p>
            <p className="text-sm font-mono text-slate-200 truncate">{role.metrics.salesCycle}d</p>
          </div>
          <div className="space-y-1 overflow-hidden">
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-widest truncate">Quota Hit</p>
            <p className="text-sm font-mono text-emerald-500 truncate">{role.metrics.quotaAttainment}%</p>
          </div>
        </div>

        {/* Footer: Environment DNA */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex gap-2 overflow-hidden flex-1 pr-4">
            <div className="flex items-center gap-1.5 border border-slate-800 bg-zinc-950 px-2 py-1 rounded-sm flex-shrink-0 max-w-[120px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span className="text-[10px] text-slate-400 font-mono truncate">{role.dna.methodology.join(", ")}</span>
            </div>
            
            {role.dna.stack.slice(0,2).map(stackItem => (
              <div key={stackItem} className="flex items-center gap-1 border border-slate-800 bg-zinc-950 px-2 py-1 rounded-sm flex-shrink-0">
                <span className="text-[10px] text-slate-400 font-mono truncate">{stackItem}</span>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-1 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors flex-shrink-0">
            View Role <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
