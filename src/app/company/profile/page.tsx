"use client";

import { Building2, Save, Globe, Trophy, Target, Workflow, Users, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function CompanyProfile() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-800/80 bg-zinc-950 px-8 py-6 flex items-center justify-between z-10">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-white">Company Profile</h1>
          <p className="text-sm text-slate-400 mt-1 font-mono">Manage your AccountExecutive.com storefront.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-4 py-2 rounded-md transition-colors text-sm flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-4xl space-y-12 pb-20">
            
            {/* Context Header */}
            <div className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900 border border-slate-800 text-sm">
              <Building2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-white font-medium">This is how top AEs evaluate you.</p>
                <p className="text-slate-400 leading-relaxed">
                  Elite sales talent looks past the marketing fluff. They care about ACV, sales cycles, quota attainment, and your RevOps stack. Complete this profile accurately to attract operator-grade talent.
                </p>
              </div>
            </div>

            {/* Core Identity */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <h2 className="text-lg font-heading font-medium text-white">Core Identity</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Company Name</label>
                  <input type="text" defaultValue="Acme Corp" className="w-full bg-zinc-900 border border-slate-800 text-white rounded-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Website URL</label>
                  <input type="text" defaultValue="https://acmecorp.com" className="w-full bg-zinc-900 border border-slate-800 text-white rounded-sm px-4 py-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Elevator Pitch (Sales focused)</label>
                  <textarea rows={3} defaultValue="We are building the definitive data infrastructure for the enterprise. Last year we doubled ARR to $24M. We are investing heavily in a mature enterprise sales motion to move upmarket." className="w-full bg-zinc-900 border border-slate-800 text-white rounded-sm px-4 py-3 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all resize-none" />
                </div>
              </div>
            </section>

            {/* Sales Organization DNA */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Target className="w-4 h-4 text-slate-400" />
                <h2 className="text-lg font-heading font-medium text-white">Sales Organization DNA</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Avg Contract Value (ACV)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">$</span>
                    <input type="text" defaultValue="65,000" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-7 pr-4 py-2.5 focus:border-emerald-500 focus:outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Avg Sales Cycle</label>
                  <div className="relative">
                    <input type="text" defaultValue="45" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-12 py-2.5 focus:border-emerald-500 focus:outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">Days</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Win Rate</label>
                  <div className="relative">
                    <input type="text" defaultValue="28" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-8 py-2.5 focus:border-emerald-500 focus:outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Metrics */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Trophy className="w-4 h-4 text-slate-400" />
                <h2 className="text-lg font-heading font-medium text-white">Performance Metrics</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">% Reps Attaining Quota</label>
                  <div className="relative">
                    <input type="text" defaultValue="62" className="w-full bg-zinc-900 border border-slate-800 text-white font-mono rounded-sm pl-4 pr-8 py-2.5 focus:border-emerald-500 focus:outline-none transition-all" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-xs">%</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Trailing 12 months</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-500 uppercase">Fundraising Stage</label>
                  <select className="w-full bg-zinc-900 border border-slate-800 text-white rounded-sm px-4 py-2.5 focus:border-emerald-500 focus:outline-none transition-all appearance-none">
                    <option>Series A</option>
                    <option>Series B</option>
                    <option selected>Series C</option>
                    <option>Series D+</option>
                    <option>Public</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Operational Stack */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Workflow className="w-4 h-4 text-slate-400" />
                <h2 className="text-lg font-heading font-medium text-white">Operational Stack & Motion</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-mono text-slate-500 uppercase">RevOps Stack</label>
                  <div className="flex flex-wrap gap-2">
                    {["Salesforce", "Clari", "Gong", "Outreach", "ZoomInfo"].map(tool => (
                      <div key={tool} className="flex items-center gap-2 bg-zinc-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {tool}
                      </div>
                    ))}
                    <button className="border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 px-3 py-1.5 rounded-full text-xs transition-colors">
                      + Add Tool
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-mono text-slate-500 uppercase">Sales Methodology</label>
                  <div className="flex flex-wrap gap-2">
                    {["MEDDPICC", "Command of the Message"].map(method => (
                      <div key={method} className="flex items-center gap-2 bg-zinc-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {method}
                      </div>
                    ))}
                    <button className="border border-dashed border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 px-3 py-1.5 rounded-full text-xs transition-colors">
                      + Add Methodology
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Right Pane Checklist / Telemetry */}
        <div className="w-[320px] flex-shrink-0 border-l border-slate-800 bg-zinc-950/50 p-6 overflow-y-auto">
          <div className="space-y-6">
            
            {/* Storefront Quality Score */}
            <div className="bg-zinc-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-slate-300">Storefront Quality</span>
                <span className="text-lg font-mono text-emerald-400">85%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden mb-6 border border-slate-800">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }} />
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400 leading-tight">Sales DNA metrics completed</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400 leading-tight">RevOps stack defined</span>
                </div>
                <div className="flex items-start gap-3 opacity-60">
                  <div className="w-4 h-4 rounded-full border border-slate-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-400 leading-tight">Missing leadership team quotes (Improves conversion by 14%)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-md border border-slate-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors group">
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Preview Public Profile</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-md border border-slate-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors group">
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Manage Connected ATS</span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-slate-300">Profile Views</p>
                  <p className="text-xl font-mono text-white mt-1">1,204</p>
                  <p className="text-[10px] text-emerald-500 mt-1">+12% this week</p>
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
