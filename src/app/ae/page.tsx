"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { RoleTriageCard } from "@/components/ae/RoleTriageCard";
import { RoleCarousel } from "@/components/ae/RoleCarousel";
import { RoleFilterSidebar } from "@/components/ae/RoleFilterSidebar";
import { mockRoles } from "@/lib/mock-roles";

export default function AEDiscovery() {
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle Command+K focus when in the dual pane view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim().length > 0) {
      setIsSubmitted(true);
      e.currentTarget.blur();
    }
  };

  // If in Explore mode (not submitted)
  if (!isSubmitted) {
    return (
      <div className="flex flex-col h-full overflow-y-auto w-full bg-zinc-950 custom-scrollbar">
        {/* Massive Hero Explore Section */}
        <div className="w-full max-w-5xl mx-auto px-8 pt-24 pb-16 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-heading font-semibold tracking-tight text-white mb-3">Role Discovery</h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Explore thematic subsets of open roles or use natural language to surface positions meeting your exact requirements.
            </p>
          </div>
          
          <div className="relative w-full max-w-4xl group">
            <div className="absolute inset-0 bg-emerald-500/5 blur-xl group-focus-within:bg-emerald-500/10 transition-colors duration-500" />
            <div className="relative flex items-center">
              <Search className="w-6 h-6 absolute left-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="e.g. Find Series C Enterprise roles with >$300k OTE and >65% quota attainment..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-zinc-900 border border-slate-800 text-white font-mono text-base placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 rounded-none shadow-xl px-14 py-5 transition-all"
              />
              <div className="absolute right-5 flex items-center gap-2 pointer-events-none">
                <span className="text-xs font-mono text-slate-600">Press</span>
                <kbd className="px-2 py-1 rounded bg-zinc-950 border border-slate-800 text-[10px] text-slate-400 font-sans shadow-sm ring-1 ring-black/50">Enter</kbd>
                <span className="text-xs font-mono text-slate-600">to search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Subsets */}
        <div className="w-full max-w-5xl mx-auto px-8 pb-20 space-y-16">
          <RoleCarousel 
            title="Enterprise roles at companies that just raised Series C"
            slug="series-c-enterprise"
            roles={mockRoles.slice(0, 5)}
          />
          <RoleCarousel 
            title="Roles where AEs are beating quota (>70% Team Attainment)"
            slug="crushing-quota"
            roles={[...mockRoles].reverse()}
          />
        </div>
      </div>
    );
  }

  // If in Submitted mode (Dual Pane)
  return (
    <div className="flex w-full h-full overflow-hidden bg-background">
      {/* 1. Left Sidebar Filters (Always exactly 300px) */}
      <div className="w-[300px] flex-shrink-0 border-r border-slate-800 bg-zinc-950 z-10 relative">
        <RoleFilterSidebar simulatedQuery={query} />
      </div>

      {/* 2. Main Right Pane (Flex column: Toolbar + Grid) */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-zinc-950/80">
        
        {/* Top Action Bar */}
        <div className="h-16 flex-shrink-0 border-b border-slate-800/80 bg-zinc-950/95 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-full max-w-lg">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              ref={searchInputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                // If they clear it entirely and hit enter, maybe go back to explore
              }}
              className="w-full bg-zinc-900/50 border border-slate-800 text-white font-mono text-sm placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900 rounded-sm px-9 py-2 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none opacity-50">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-slate-700 text-[10px] text-slate-300 font-sans shadow-sm">⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>{mockRoles.length} matches</span>
            <div className="h-4 w-px bg-slate-800" />
            <button className="hover:text-white uppercase tracking-widest transition-colors">Sort: Relevance</button>
          </div>
        </div>

        {/* Scrolling Grid Area */}
        <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {mockRoles.map(role => (
              <RoleTriageCard key={role.id} role={role} />
            ))}
            <div className="h-20" /> {/* Scroll padding */}
          </div>
        </div>

      </div>

      {/* Global Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}} />
    </div>
  );
}
