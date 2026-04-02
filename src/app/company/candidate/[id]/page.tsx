import { mockCandidates } from "@/lib/mock-candidates";
import Link from "next/link";
import { ChevronLeft, Check, Zap, Code, ShieldCheck, FileText, Scale, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

function formatPercent(value: number) {
  return (value).toFixed(0) + "%";
}

export default async function CandidateProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const candidate = mockCandidates.find(c => c.id === id) || mockCandidates[0];

  // We multiply the format percent raw value because the mock data has percentages stored as whole numbers like 105 or 120
  // Actually wait, look at our mock data format, avg_quota_attainment is 105 / 120 / etc.
  // We'll trust the integer directly.

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background">
      {/* Header Bar */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-6xl px-8 py-6 mx-auto flex flex-col gap-4">
          <Link href="/company/discover" className="inline-flex items-center text-xs font-mono text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" /> Return to Discovery
          </Link>
          
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-heading font-semibold tracking-tight">{candidate.anonymized_alias}</h1>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-500 text-[10px] font-mono tracking-wider uppercase flex items-center gap-1 border border-emerald-500/30">
                     <ShieldCheck className="w-3 h-3" /> Fully Vetted
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-mono mt-1 text-sm">
                  <span>{candidate.current_role.title}</span>
                  <span>•</span>
                  <span>{candidate.current_role.company_tier}</span>
                  <span>•</span>
                  <span>{candidate.time_in_role_months} mos tenure</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="rounded-none bg-primary text-primary-foreground shadow-sm hover:bg-emerald-600 px-8">
                <Check className="w-4 h-4 mr-2" />
                Route to ATS Platform
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl px-8 py-8 mx-auto grid grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: History and Diagnostics */}
        <div className="col-span-2 space-y-8">
          
          <div className="bg-card border border-border p-6 shadow-sm">
             <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <FileText className="w-4 h-4" /> Intent Signal & Motivation
             </h3>
             <div className="text-lg leading-relaxed text-foreground font-medium">
               "My current organization is actively restructuring the GTM motion from enterprise back to mid-market PLG. I am looking for a heavy enterprise motion with 9-12 month sales cycles and 6-figure ACVs. My sweet spot is highly complex consensus-based selling."
             </div>
          </div>

          <div className="bg-card border border-border p-6 shadow-sm">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6 flex items-center gap-2">
               <Scale className="w-4 h-4" /> Performance Truth
            </h3>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 border border-border bg-background">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Avg Deal Size</div>
                <div className="text-2xl font-mono">{formatMoney(candidate.metrics.avg_deal_size)}</div>
              </div>
              <div className="p-4 border border-border bg-background">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Avg Quota Attainment</div>
                <div className="text-2xl font-mono text-primary">{formatPercent(candidate.metrics.avg_quota_attainment)}</div>
              </div>
              <div className="p-4 border border-border bg-background">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-1">Sales Cycle Length</div>
                <div className="text-2xl font-mono">{candidate.metrics.sales_cycle} Days</div>
              </div>
            </div>

            {/* Quarter by Quarter Bar Chart approximation */}
            <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-4 mt-12">Trailing 4 Quarters Attainment</div>
            <div className="flex gap-4 items-end h-32 border-b border-border pb-4">
               {[104, 125, 98, 145].map((pct, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-2">
                   <div 
                     className="w-full bg-primary/20 border border-primary/50 relative overflow-hidden" 
                     style={{ height: `${(pct / 150) * 100}%` }}
                   >
                     {/* subtle target line at 100% implicitly inside the chart visually */}
                     {pct > 100 && (
                       <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                     )}
                   </div>
                   <span className="text-xs font-mono">{formatPercent(pct)}</span>
                 </div>
               ))}
            </div>
            <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground px-[10%]">
               <span>Q2 '25</span>
               <span>Q3 '25</span>
               <span>Q4 '25</span>
               <span>Q1 '26</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Hard Constraints */}
        <div className="col-span-1 space-y-8">
          
          <div className="bg-card border border-border p-6 shadow-sm">
             <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">Financial Matrix</h3>
             <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Target OTE</span>
                  <span className="font-mono text-foreground font-semibold">{formatMoney(candidate.target_ote)}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Base Floor</span>
                  <span className="font-mono text-foreground">{formatMoney(candidate.target_ote * 0.5)}</span>
                </div>
             </div>
          </div>

          <div className="bg-card border border-border p-6 shadow-sm">
             <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">Execution DNA</h3>
             
             <div className="mb-4">
               <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2"><Zap className="w-3 h-3" /> Methodologies</div>
               <div className="flex flex-wrap gap-2">
                 {candidate.metrics.methodologies.map((m: string) => (
                   <span key={m} className="bg-secondary text-secondary-foreground font-mono text-xs px-2 py-1">{m}</span>
                 ))}
               </div>
             </div>

             <div>
               <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2"><Code className="w-3 h-3" /> Tech Stack Experience</div>
               <div className="flex flex-wrap gap-2">
                 {candidate.metrics.tech_stack.map((m: string) => (
                   <span key={m} className="border border-border text-muted-foreground font-mono text-xs px-2 py-1">{m}</span>
                 ))}
               </div>
             </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}
