import { CandidateTriageCard } from "@/components/company/CandidateTriageCard";
import { mockCandidates } from "@/lib/mock-candidates";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function LensPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Minimal routing logic for prototype
  const title = slug === "outperformed-quota" ? "AEs who outperformed quota 2 consecutive quarters" : "Enterprise AEs from companies that IPO'd";
  
  // Use all pool candidates for prototype demo
  const poolCandidates = mockCandidates.filter(c => c.status === "pool");

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background relative">
      <div className="border-b border-border bg-card/50 h-[256px] px-8 pb-8 flex flex-col justify-end flex-shrink-0">
        <div className="max-w-5xl mx-auto w-full">
           <Link href="/company/discover" className="inline-flex items-center text-xs font-mono text-muted-foreground uppercase tracking-widest hover:text-primary mb-6 transition-colors">
             <ChevronLeft className="w-4 h-4 mr-1" /> Back to Discovery
           </Link>
           <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">{title}</h1>
           <p className="text-muted-foreground mt-4 max-w-xl">
             Review the narrowed dataset of {poolCandidates.length} high-signal candidates perfectly matching this lens matrix.
           </p>
        </div>
      </div>

      <div className="max-w-5xl px-8 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {poolCandidates.map(c => (
             <CandidateTriageCard key={c.id} candidate={c} mode="search" />
          ))}
        </div>
      </div>
    </div>
  );
}
