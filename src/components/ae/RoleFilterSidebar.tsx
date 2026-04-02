import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';

interface FilterAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterAccordion({ title, defaultOpen = false, children }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-800/50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-zinc-900/30 transition-colors"
      >
        <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 pt-1 animate-in slide-in-from-top-1 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

function FilterCheckbox({ label, active = false }: { label: string, active?: boolean }) {
  const [isChecked, setIsChecked] = useState(active);
  useEffect(() => { setIsChecked(active); }, [active]);

  return (
    <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setIsChecked(!isChecked)}>
      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
        isChecked 
          ? 'bg-emerald-600 border-emerald-500' 
          : 'border-slate-700 bg-zinc-950 group-hover:border-slate-500'
      }`}>
        {isChecked && <div className="w-2 h-2 bg-white rounded-sm" />}
      </div>
      <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
    </label>
  );
}

function FilterInput({ placeholder, icon, initialValue = "" }: { placeholder: string, icon?: React.ReactNode, initialValue?: string }) {
  const [val, setVal] = useState(initialValue);
  useEffect(() => { setVal(initialValue); }, [initialValue]);

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

export function RoleFilterSidebar({ simulatedQuery = "" }: { simulatedQuery?: string }) {
  const hasQuery = simulatedQuery.trim().length > 0;

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col overflow-y-auto custom-scrollbar">
      <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur border-b border-slate-800 p-5 flex items-center justify-between">
        <span className="font-heading font-medium text-slate-200">Filters</span>
        <button className="text-xs font-mono text-emerald-500 hover:text-emerald-400">Reset</button>
      </div>

      <div className="flex-1">
        <FilterAccordion title="Target ACV Segment" defaultOpen>
          <FilterCheckbox label="Enterprise (ACV $100k+)" active={hasQuery} />
          <FilterCheckbox label="Mid-Market (ACV $25k-$100k)" />
          <FilterCheckbox label="SMB (ACV <$25k)" />
        </FilterAccordion>

        <FilterAccordion title="Company Stage" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <FilterCheckbox label="Seed / Series A" />
              <FilterCheckbox label="Series B - C" active={hasQuery} />
              <FilterCheckbox label="Series D+" />
              <FilterCheckbox label="Public" />
            </div>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Role Economics" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Target OTE</label>
              <div className="flex items-center gap-2">
                <FilterInput placeholder="Min" initialValue={hasQuery ? "$300k" : ""} />
                <span className="text-slate-600">-</span>
                <FilterInput placeholder="Max" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Min Base Salary</label>
              <FilterInput placeholder="e.g. $150k" />
            </div>
          </div>
        </FilterAccordion>

        <FilterAccordion title="Sales DNA" defaultOpen>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500">Required Methodology</label>
              <FilterCheckbox label="MEDDPICC" active={hasQuery} />
              <FilterCheckbox label="Command of the Message" />
              <FilterCheckbox label="Sandler" />
              <FilterCheckbox label="Challenger" />
            </div>
          </div>
        </FilterAccordion>
      </div>
    </div>
  );
}
