import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

interface FilterAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterAccordion({ title, defaultOpen = true, children }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-800/60 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-5 text-left hover:bg-zinc-900/50 transition-colors"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400 font-semibold">{title}</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function FilterCheckbox({ label, active = false }: { label: string, active?: boolean }) {
  const [isChecked, setIsChecked] = useState(active);
  
  // Re-sync if the active prop updates dynamically for the simulation
  useEffect(() => {
    setIsChecked(active);
  }, [active]);

  return (
    <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsChecked(!isChecked)}>
      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
        isChecked 
          ? 'bg-emerald-600 border-emerald-500' 
          : 'border-slate-700 bg-zinc-950 group-hover:border-slate-500'
      }`}>
        {isChecked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`text-sm ${isChecked ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'} transition-colors`}>
        {label}
      </span>
    </label>
  );
}

function FilterInput({ placeholder, icon, initialValue = "" }: { placeholder: string, icon?: React.ReactNode, initialValue?: string }) {
  const [val, setVal] = useState(initialValue);
  
  // Update internal state if initialValue changes (for the simulation)
  useEffect(() => {
    setVal(initialValue);
  }, [initialValue]);

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </div>
      )}
      <input 
        type="text" 
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-zinc-950 border border-slate-800 rounded-md text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-colors py-2 ${icon ? 'pl-9 pr-3' : 'px-3'}`}
      />
    </div>
  );
}

export function CandidateFilterSidebar({ simulatedQuery = "" }: { simulatedQuery?: string }) {
  const hasQuery = simulatedQuery.trim().length > 0;

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col overflow-y-auto custom-scrollbar">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between">
        <span className="font-heading font-medium text-slate-200">Filters</span>
        <button className="text-xs font-mono text-emerald-500 hover:text-emerald-400 transition-colors">
          Reset
        </button>
      </div>

      <div className="flex-1">
        <FilterAccordion title="Target Segment" defaultOpen>
          <FilterCheckbox label="Enterprise (ACV $100k+)" active={hasQuery} />
          <FilterCheckbox label="Mid-Market (ACV $25k-$100k)" />
          <FilterCheckbox label="SMB / Velocity (ACV <$25k)" />
        </FilterAccordion>

        <FilterAccordion title="Performance" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Quota Attainment (Trailing 12mo)</label>
              <FilterInput placeholder="e.g. Min 100%" initialValue={hasQuery ? "105%" : ""} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Average Deal Size</label>
              <div className="flex items-center gap-2">
                <FilterInput placeholder="Min" />
                <span className="text-slate-600">-</span>
                <FilterInput placeholder="Max" />
              </div>
            </div>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Past Experience" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Past Companies</label>
              <FilterInput placeholder="Search (e.g. Stripe, Salesforce)..." icon={<Search className="w-3.5 h-3.5" />} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 block mb-2">Time in Current Role</label>
              <FilterCheckbox label="< 1 year" />
              <FilterCheckbox label="1-2 years" />
              <FilterCheckbox label="2-4 years" active={hasQuery} />
              <FilterCheckbox label="4+ years (Tenured)" />
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-800/50">
              <label className="text-xs font-medium text-slate-500 block mb-2">Primary Selling Motion</label>
              <FilterCheckbox label="Product-Led Growth (PLG)" />
              <FilterCheckbox label="Sales-Led Growth (SLG)" />
            </div>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Environment" defaultOpen>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 block mb-2">Company Stage</label>
            <FilterCheckbox label="Early Stage (Seed/A)" />
            <FilterCheckbox label="Growth (Series B-D)" />
            <FilterCheckbox label="Late Stage / Pre-IPO" />
            <FilterCheckbox label="Post-IPO / Public" active={hasQuery} />
          </div>
        </FilterAccordion>

        <FilterAccordion title="Intent Signals" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <FilterCheckbox label="Open to new roles" active />
              <FilterCheckbox label="Actively interviewing" />
            </div>
            
            <div className="space-y-2 pt-2 border-t border-slate-800/50">
              <label className="text-xs font-medium text-slate-500">Target Geographies</label>
              <FilterInput placeholder="Search locations..." icon={<Search className="w-3.5 h-3.5" />} />
            </div>
          </div>
        </FilterAccordion>
        
        {/* Extra padding at the bottom for scrolling comfort */}
        <div className="h-20" />
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
