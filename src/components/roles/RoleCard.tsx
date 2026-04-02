import { Role } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Lock, Target, TrendingUp, Clock, Code, BookOpen } from "lucide-react";

export function RoleCard({ role }: { role: Role }) {
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };
  
  const formatPercent = (percent: number) => {
    return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 }).format(percent);
  };

  return (
    <div className="flex flex-col border border-border bg-card text-card-foreground p-6 rounded-none sm:rounded-xl transition-all hover:border-primary/50 group relative overflow-hidden h-full">
      <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-primary transition-colors" />
      
      <div className="flex justify-between items-start mb-6 pl-3">
        <div className="pr-4">
          <h3 className="text-xl font-heading font-semibold tracking-tight">{role.title_level}</h3>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-2 gap-2">
            <span className="font-mono text-xs px-2 py-0.5 bg-secondary text-secondary-foreground uppercase tracking-wider">{role.company.tier}</span>
            <span>•</span>
            <span className="text-foreground">{role.company.stage} Company</span>
            <span>•</span>
            <span>{role.segment}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-2xl font-mono text-foreground">{formatMoney(role.compensation.ote)} <span className="text-sm text-muted-foreground font-sans">OTE</span></div>
          <div className="text-sm font-mono text-muted-foreground mt-1">{formatMoney(role.compensation.base)} Base</div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-5 border-t border-b border-border pl-3 flex-grow">
        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5 uppercase tracking-wider"><Target className="w-3.5 h-3.5 text-primary" /> Quota</span>
          <span className="font-mono text-lg text-foreground">{formatPercent(role.operational_metrics.quota_attainment)}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5 uppercase tracking-wider"><TrendingUp className="w-3.5 h-3.5 text-primary" /> Avg Deal</span>
          <span className="font-mono text-lg text-foreground">{formatMoney(role.operational_metrics.deal_size)}</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5 uppercase tracking-wider"><Clock className="w-3.5 h-3.5 text-primary" /> Cycle</span>
          <span className="font-mono text-lg text-foreground">{role.operational_metrics.sales_cycle} Days</span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 mb-1.5 uppercase tracking-wider"><BookOpen className="w-3.5 h-3.5 text-primary" /> Stack</span>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {role.operational_metrics.methodology.map(m => (
              <span key={m} className="bg-secondary text-secondary-foreground font-mono text-[10px] px-1.5 py-0.5 tracking-wide">{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between items-center pl-3">
        <div className="flex items-center gap-2">
           <Code className="w-4 h-4 text-muted-foreground" />
           <div className="flex gap-2">
             {role.operational_metrics.tech_stack.map(tech => (
               <span key={tech} className="text-xs text-muted-foreground font-mono">{tech}</span>
             ))}
           </div>
        </div>
        
        <Dialog>
          <DialogTrigger render={<Button className="rounded-none bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20" />}>
            <Lock className="w-3 h-3 mr-2" />
            Unlock Details
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] border-border bg-background p-0 rounded-none sm:rounded-xl overflow-hidden gap-0">
            <div className="bg-card p-6 border-b border-border">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-heading font-semibold tracking-tight">{role.title_level}</h2>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Lock className="w-3 h-3 text-primary" />
                    <span>Company Name Hidden</span>
                    <span>•</span>
                    <span className="font-mono">{role.company.tier}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-mono text-primary">{formatMoney(role.compensation.ote)}</div>
                  <div className="text-sm text-muted-foreground font-mono">{formatMoney(role.compensation.base)} Base</div>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Operational Context</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-foreground/80">Segment Focus</span>
                      <span className="text-sm font-mono">{role.segment}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-foreground/80">Location</span>
                      <span className="text-sm font-mono">{role.location}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-foreground/80">Sales Cycle</span>
                      <span className="text-sm font-mono">{role.operational_metrics.sales_cycle} Days</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-foreground/80">Average Deal Size</span>
                      <span className="text-sm font-mono">{formatMoney(role.operational_metrics.deal_size)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-border/50 pb-2">
                      <span className="text-sm text-foreground/80">Target Rep Attainment</span>
                      <span className="text-sm font-mono text-primary">{formatPercent(role.operational_metrics.quota_attainment)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-2 flex-col gap-2">
                      <span className="text-sm text-foreground/80">Methodology</span>
                      <div className="flex flex-wrap gap-1">
                        {role.operational_metrics.methodology.map(m => (
                          <span key={m} className="bg-secondary text-secondary-foreground font-mono text-[10px] px-1.5 py-0.5">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between border-border/50 pb-2 flex-col gap-2">
                      <span className="text-sm text-foreground/80">Tech Stack</span>
                      <div className="flex flex-wrap gap-1">
                        {role.operational_metrics.tech_stack.map(m => (
                          <span key={m} className="border border-border text-muted-foreground font-mono text-[10px] px-1.5 py-0.5">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-secondary/50 border-t border-border flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Unlock requires a pro subscription.</span>
              <Button className="rounded-none bg-primary text-primary-foreground hover:bg-emerald-600">
                <Lock className="w-4 h-4 mr-2" />
                Unlock Candidate Pool
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
