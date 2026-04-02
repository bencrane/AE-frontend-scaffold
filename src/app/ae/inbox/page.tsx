"use client";

import { MessageSquare, Calendar, Building2, ChevronRight, Search, Paperclip, Send } from "lucide-react";

export default function AEInbox() {
  return (
    <div className="flex w-full h-full bg-background overflow-hidden">
      
      {/* List / Deal Desk Pane */}
      <div className="w-[350px] flex-shrink-0 border-r border-slate-800 bg-zinc-950 flex flex-col h-full z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-heading font-semibold text-white mb-4">Active Processes</h1>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search companies..."
              className="w-full bg-zinc-900 border border-slate-800 text-white font-mono text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 rounded-sm pl-9 pr-3 py-2"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {/* Active Process 1 */}
          <button className="w-full text-left bg-zinc-900 border border-emerald-500/30 rounded-md p-4 transition-colors relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-white">Acme Corp</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Final Round</span>
            </div>
            <p className="text-xs text-slate-400 mb-3 truncate">Strategic Account Executive</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Sarah Jenkins (VP Sales)</span>
              <span>2h ago</span>
            </div>
          </button>

          {/* Active Process 2 */}
          <button className="w-full text-left bg-zinc-950 hover:bg-zinc-900/50 border border-slate-800 rounded-md p-4 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-200">Stripe</span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">Initial Screen</span>
            </div>
            <p className="text-xs text-slate-500 mb-3 truncate">Enterprise AE, FinServ</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>Michael Chen (Recruiting)</span>
              <span>1d ago</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Conversation Pane */}
      <div className="flex-1 bg-zinc-950 flex flex-col h-full relative">
        
        {/* Thread Header */}
        <div className="h-20 border-b border-slate-800 bg-zinc-950/95 flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-zinc-900 border border-slate-800 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-semibold text-white">Acme Corp</h2>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Strategic Account Executive</span>
                <span>•</span>
                <span className="text-emerald-500 font-semibold">$320k OTE</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-zinc-900 border border-slate-800 hover:bg-zinc-800 text-slate-300 font-medium px-3 py-1.5 rounded-md transition-colors text-xs flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> Book Sync
            </button>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-4 py-1.5 rounded-md transition-colors text-sm">
              Accept Offer
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
          <div className="flex flex-col gap-1 items-center pb-8 border-b border-slate-800 mb-8">
            <div className="text-[10px] uppercase tracking-widest font-mono text-slate-600 mb-2">Process Started</div>
            <span className="text-xs text-slate-400">Oct 12, 2024</span>
          </div>

          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-400">SJ</div>
            <div className="bg-zinc-900 border border-slate-800 rounded-lg rounded-tl-none p-4 text-sm text-slate-300 leading-relaxed">
              <p className="mb-2">Hi John! Great speaking with you today. The team is incredibly impressed with your motion and numbers at your current org.</p>
              <p>I'd like to fast-track you to a final presentation with our CRO next Tuesday. Does this timeline generally work for you?</p>
            </div>
          </div>

          <div className="flex items-start gap-4 max-w-2xl ml-auto flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-emerald-500">JS</div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg rounded-tr-none p-4 text-sm text-slate-200 leading-relaxed">
              <p className="mb-2">Hey Sarah, appreciate the quick turnaround.</p>
              <p>Tuesday works well on my end. I'll prep the mock discovery deck we discussed based on the prompt you sent over. Let me know what time works for the CRO.</p>
            </div>
          </div>
        </div>

        {/* Compose */}
        <div className="p-6 border-t border-slate-800 bg-zinc-950 flex-shrink-0">
          <div className="bg-zinc-900 border border-slate-800 rounded-md p-2 flex items-end gap-2">
            <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea 
              rows={2} 
              placeholder="Draft your response..."
              className="w-full bg-transparent border-none text-white font-sans text-sm focus:outline-none resize-none px-2 py-2"
            />
            <button className="p-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded transition-colors group">
              <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
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
