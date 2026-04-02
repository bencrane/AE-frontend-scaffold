"use client";

import { Candidate } from "@/lib/mock-candidates";
import { Button } from "@/components/ui/button";
import { Check, X, Building, Target, Zap, Code } from "lucide-react";
import { useRouter } from "next/navigation";

function formatPercent(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CandidateTriageCard({ candidate, mode = "triage" }: { candidate: Candidate, mode?: "triage" | "search" }) {
  const router = useRouter();
  return (
    <div className="h-full bg-card border border-border flex flex-col group overflow-hidden">
      <div className="p-6 pb-4 flex justify-between items-start border-b border-border bg-secondary/20 flex-shrink-0">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-heading font-semibold tracking-tight truncate">{candidate.anonymized_alias}</span>
            {mode === "triage" && candidate.expressed_interest_in_role && (
              <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-mono tracking-wider uppercase flex-shrink-0">
                Intent: {candidate.expressed_interest_in_role}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono truncate">
            <span>{candidate.current_role.title}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Building className="w-3 h-3" />
              {candidate.current_role.company_tier} ({candidate.current_role.company_stage})
            </div>
            <span>•</span>
            <span className="whitespace-nowrap">{candidate.time_in_role_months} mos tenure</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 pt-0.5">
          <div className="text-2xl font-mono text-primary font-semibold">{candidate.match_score}/100</div>
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Match Score</div>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-border flex-shrink-0">
        <div className="p-4 flex flex-col justify-center overflow-hidden">
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1 truncate">Target ACV</div>
          <div className="text-lg font-mono truncate">{formatMoney(candidate.metrics.avg_deal_size)}</div>
        </div>
        <div className="p-4 flex flex-col justify-center overflow-hidden">
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1 truncate">Quota Hit</div>
          <div className="text-lg font-mono text-primary truncate">{formatPercent(candidate.metrics.avg_quota_attainment)}</div>
        </div>
        <div className="p-4 flex flex-col justify-center overflow-hidden">
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1 truncate">Cycle</div>
          <div className="text-lg font-mono truncate">{candidate.metrics.sales_cycle} Days</div>
        </div>
        <div className="p-4 flex flex-col justify-center overflow-hidden">
          <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1 truncate">Target OTE</div>
          <div className="text-lg font-mono">{formatMoney(candidate.target_ote)}</div>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-border flex justify-between items-center bg-background mt-auto flex-shrink-0">
         <div className="flex items-center gap-4 flex-1 min-w-0 pr-4 overflow-hidden">
           <div className="flex items-center gap-2 flex-shrink-0 max-w-[150px]">
             <Zap className="w-3 h-3 text-muted-foreground flex-shrink-0" />
             <div className="flex gap-1 overflow-hidden">
               {candidate.metrics.methodologies.map((m: string) => (
                 <span key={m} className="bg-secondary text-secondary-foreground font-mono text-[10px] px-1.5 py-0.5 truncate">{m}</span>
               ))}
             </div>
           </div>
           <div className="flex items-center gap-2 flex-1 min-w-0">
             <Code className="w-3 h-3 text-muted-foreground flex-shrink-0" />
             <div className="flex gap-1 overflow-hidden pointer-events-none">
               {candidate.metrics.tech_stack.map((m: string) => (
                 <span key={m} className="border border-border text-muted-foreground font-mono text-[10px] px-1.5 py-0.5 flex-shrink-0 truncate">{m}</span>
               ))}
             </div>
           </div>
         </div>
         <div className="flex gap-3 flex-shrink-0">
           {mode === "triage" ? (
             <>
               <Button variant="outline" className="rounded-none border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
                 <X className="w-4 h-4 mr-2" />
                 Pass
               </Button>
               <Button className="rounded-none bg-primary text-primary-foreground hover:bg-emerald-600">
                 <Check className="w-4 h-4 mr-2" />
                 Reveal & Route to ATS
               </Button>
             </>
           ) : (
             <Button 
               className="rounded-none bg-primary text-primary-foreground hover:bg-emerald-600"
               onClick={() => router.push(`/company/candidate/${candidate.id}`)}
             >
               <Target className="w-4 h-4 mr-2" />
               Reveal Candidate
             </Button>
           )}
         </div>
      </div>
    </div>
  );
}
