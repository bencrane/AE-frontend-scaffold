import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RoleFilters() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="font-heading font-semibold text-lg mb-4 tracking-tight border-b border-border pb-2">Filter Roles</h3>
        
        <div className="space-y-6">
          {/* Segment Filter */}
          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Market Segment</Label>
            <div className="flex flex-col gap-2">
              {['Enterprise', 'Strategic', 'Mid-Market', 'SMB'].map((segment) => (
                <label key={segment} className="flex items-center space-x-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-border rounded-none flex items-center justify-center group-hover:border-primary transition-colors">
                    {/* Fake checkbox state could go here */}
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground">{segment}</span>
                </label>
              ))}
            </div>
          </div>

          {/* OTE Range */}
          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Target OTE</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="rounded-none border-border font-mono text-xs justify-start px-2 hover:border-primary/50 text-muted-foreground">$150k+</Button>
              <Button variant="outline" className="rounded-none border-border font-mono text-xs justify-start px-2 hover:border-primary/50 text-muted-foreground">$250k+</Button>
              <Button variant="outline" className="rounded-none border-border font-mono text-xs justify-start px-2 hover:border-primary/50 text-muted-foreground">$300k+</Button>
              <Button variant="outline" className="rounded-none border-border font-mono text-xs justify-start px-2 hover:border-primary/50 text-muted-foreground">$350k+</Button>
            </div>
          </div>

          {/* Methodology */}
          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Methodology</Label>
            <div className="flex flex-wrap gap-2">
              {['MEDDPICC', 'MEDDIC', 'Sandler', 'Challenger', 'Command'].map((method) => (
                <span key={method} className="text-xs font-mono border border-border px-2 py-1 hover:bg-secondary cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                  {method}
                </span>
              ))}
            </div>
          </div>
          
          {/* Company Stage */}
          <div className="space-y-3">
            <Label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company Stage</Label>
             <div className="flex flex-col gap-2">
              {['Seed / Series A', 'Series B / C', 'Late Stage Private', 'Public'].map((stage) => (
                <label key={stage} className="flex items-center space-x-2 cursor-pointer group">
                  <div className="w-4 h-4 border border-border rounded-none flex items-center justify-center group-hover:border-primary transition-colors"></div>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground">{stage}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
