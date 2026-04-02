"use client";

import { Activity, Eye, FileText, MousePointerClick, Calendar } from "lucide-react";

export default function AEActivity() {
  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      
      {/* Header */}
      <div className="flex-shrink-0 border-b border-slate-800/80 bg-zinc-950 px-8 py-8 flex items-center justify-between z-10">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-white">Market Telemetry</h1>
          <p className="text-sm text-slate-400 mt-2 font-mono">Real-time engagement analytics for your operator profile.</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-slate-800 rounded-md p-1">
          <button className="px-3 py-1.5 text-xs font-mono text-emerald-400 bg-zinc-950 rounded shadow-sm border border-slate-800">7 Days</button>
          <button className="px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors">30 Days</button>
          <button className="px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors">All Time</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-5xl space-y-12 pb-20">

          {/* Top-line Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-zinc-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-slate-500 uppercase">Profile Views</p>
                <Eye className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-mono text-white">124</p>
              <p className="text-xs text-emerald-500 font-mono mt-2">+12% vs last period</p>
            </div>
            
            <div className="bg-zinc-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-slate-500 uppercase">Search Appearances</p>
                <SearchIcon className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-mono text-white">1,405</p>
              <p className="text-xs text-emerald-500 font-mono mt-2">+4% vs last period</p>
            </div>

            <div className="bg-zinc-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-slate-500 uppercase">Interview Requests</p>
                <MousePointerClick className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-mono text-white">4</p>
              <p className="text-xs text-emerald-500 font-mono mt-2">+1 vs last period</p>
            </div>

            <div className="bg-zinc-900 border border-slate-800 rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono text-slate-500 uppercase">Conversion Rate</p>
                <Activity className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-mono text-white">3.2%</p>
              <p className="text-xs text-slate-500 font-mono mt-2">Views to Requests</p>
            </div>
          </div>

          {/* Audit Log */}
          <div>
            <h2 className="text-xl font-heading font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
              <FileText className="w-5 h-5 text-slate-500" /> Detailed Audit Log
            </h2>

            <div className="bg-zinc-900 border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-zinc-950/50">
                    <th className="px-6 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Timestamp</th>
                    <th className="px-6 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Action</th>
                    <th className="px-6 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Entity Segment</th>
                    <th className="px-6 py-4 text-xs font-mono text-slate-500 uppercase tracking-widest font-normal">Company Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">Today, 2:45 PM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-sm text-xs font-mono border border-emerald-500/20">
                        <MousePointerClick className="w-3 h-3" /> Interview Requested
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">Enterprise SaaS / Series C</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Vercel • VP Sales</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">Today, 10:12 AM</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-zinc-800 text-slate-300 px-2.5 py-1 rounded-sm text-xs font-mono border border-slate-700">
                        <Eye className="w-3 h-3" /> Profile Viewed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">Fintech / Public</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Stripe • Internal Recruiter</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">Yesterday</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-zinc-800 text-slate-300 px-2.5 py-1 rounded-sm text-xs font-mono border border-slate-700">
                        <SearchIcon className="w-3 h-3" /> Search Match
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">Cybersecurity / Series B</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">Hidden</td>
                  </tr>
                  <tr className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">Oct 29, 2024</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-zinc-800 text-slate-300 px-2.5 py-1 rounded-sm text-xs font-mono border border-slate-700">
                        <Eye className="w-3 h-3" /> Profile Viewed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">Data Infrastructure / Series D</td>
                    <td className="px-6 py-4 text-sm font-medium text-white">Databricks • Director of Sales</td>
                  </tr>
                </tbody>
              </table>
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

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  );
}
