import { TrendingUp, Users, Presentation, Calculator, ArrowRight } from "lucide-react";

export default function MarketIntelligence() {
  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-5xl px-8 py-8 mx-auto">
           <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">Market Intelligence</h1>
           <p className="text-muted-foreground mt-2 max-w-xl">
             Aggregated market data, segment shift alerts, and compensation benchmarking derived from real-time platform activity.
           </p>
        </div>
      </div>

      <div className="max-w-5xl px-8 py-8 mx-auto space-y-8">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Card 1: Market Pulse */}
           <div className="bg-card border border-border p-6 hover:bg-secondary/20 transition-colors cursor-pointer group">
             <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest mb-4">
               <TrendingUp className="w-4 h-4" /> AE Market Pulse
             </div>
             <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
               Enterprise AE turnover at Series C companies is up 18% this quarter.
             </h3>
             <p className="text-muted-foreground text-sm line-clamp-3">
               Based on updated activity matrices, candidates from late-stage growth companies are signaling higher intent. Review your inbound pipelines targeting Series C talent.
             </p>
             <div className="mt-6 flex items-center text-sm font-semibold text-primary">
               Read Full Report <ArrowRight className="w-4 h-4 ml-1" />
             </div>
           </div>

           {/* Card 2: Talent Shifts */}
           <div className="bg-card border border-border p-6 hover:bg-secondary/20 transition-colors cursor-pointer group">
             <div className="flex items-center gap-2 text-destructive font-mono text-xs uppercase tracking-widest mb-4">
               <Users className="w-4 h-4" /> Talent Availability Shifts
             </div>
             <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
               Segment shift detected: 14 Enterprise AEs from [Company] now active on platform.
             </h3>
             <p className="text-muted-foreground text-sm line-clamp-3">
               Following the announced GTM restructure, highly-attaining reps have begun setting intent signals to active. Act fast if you compete for this talent profile.
             </p>
             <div className="mt-6 flex items-center text-sm font-semibold text-primary">
               View Candidate Pool <ArrowRight className="w-4 h-4 ml-1" />
             </div>
           </div>

           {/* Card 3: Carrying Quota */}
           <div className="bg-card border border-border p-6 hover:bg-secondary/20 transition-colors cursor-pointer group">
             <div className="flex items-center gap-2 text-blue-500 font-mono text-xs uppercase tracking-widest mb-4">
               <Presentation className="w-4 h-4" /> Carrying Quota
             </div>
             <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
               CRO of [Company] on why they're rebuilding their mid-market motion.
             </h3>
             <p className="text-muted-foreground text-sm line-clamp-3">
               A deep dive into structural misalignments in MM sales cycles, adjusting ACV floors, and exactly what profile of AE they are actively targeting to fix the leak.
             </p>
             <div className="mt-6 flex items-center text-sm font-semibold text-primary">
               Dive In <ArrowRight className="w-4 h-4 ml-1" />
             </div>
           </div>

           {/* Card 4: Comp Benchmarking */}
           <div className="bg-card border border-border p-6 hover:bg-secondary/20 transition-colors cursor-pointer group">
             <div className="flex items-center gap-2 text-emerald-500 font-mono text-xs uppercase tracking-widest mb-4">
               <Calculator className="w-4 h-4" /> Comp Benchmarking
             </div>
             <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors leading-tight">
               Median Enterprise AE OTE at Series B companies: $285K. Your listed OTE: $260K.
             </h3>
             <p className="text-muted-foreground text-sm line-clamp-3">
               Warning: Your currently listed OTE for Enterprise AE falls below the top-quartile median for equivalent roles, negatively impacting inbound signal generation.
             </p>
             <div className="mt-6 flex items-center text-sm font-semibold text-primary">
               Update Role Targets <ArrowRight className="w-4 h-4 ml-1" />
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
