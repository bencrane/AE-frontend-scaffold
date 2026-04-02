import { mockCandidates } from "@/lib/mock-candidates";
import { CandidateTriageCard } from "@/components/company/CandidateTriageCard";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompanyDashboard() {
  const inboundCandidates = mockCandidates.filter(c => c.status === "pending_inbound");

  return (
    <div className="flex-1 overflow-y-auto w-full">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-5xl px-8 py-8 mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">Inbound Queue</h1>
              <p className="text-muted-foreground mt-2 max-w-xl">
                Review Account Executives who have explicitly expressed interest in your active roles and matched minimum intent signals. You have full access to reveal and route matches to your ATS.
              </p>
            </div>
            <div className="text-right flex-shrink-0 ml-8">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Estimated Agency Savings</div>
              <div className="text-2xl font-mono text-primary">$360,000</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-background border border-border p-4">
              <div className="text-xs font-mono uppercase text-muted-foreground">Pending Triage</div>
              <div className="text-2xl font-mono mt-1 text-primary">{inboundCandidates.length}</div>
            </div>
            <div className="bg-background border border-border p-4">
              <div className="text-xs font-mono uppercase text-muted-foreground">Routed This Month</div>
              <div className="text-2xl font-mono mt-1">12</div>
            </div>
            <div className="bg-background border border-border p-4">
              <div className="text-xs font-mono uppercase text-muted-foreground">Passed</div>
              <div className="text-2xl font-mono mt-1">45</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl px-8 py-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-heading font-medium">Action Queue</h2>
          <Button variant="outline" className="rounded-none border-border hover:bg-secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filter Queue
          </Button>
        </div>

        <div className="space-y-6">
          {inboundCandidates.map(candidate => (
            <CandidateTriageCard key={candidate.id} candidate={candidate} />
          ))}

          {inboundCandidates.length === 0 && (
            <div className="p-12 text-center border border-dashed border-border text-muted-foreground">
              No pending inbound candidates matching your intent signals.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
