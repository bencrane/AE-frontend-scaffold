"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CandidateTriageCard } from "@/components/company/CandidateTriageCard";
import { DiscoveryCarousel } from "@/components/company/DiscoveryCarousel";
import { mockCandidates } from "@/lib/mock-candidates";

export default function CandidateDiscovery() {
  const [query, setQuery] = useState("");
  const poolCandidates = mockCandidates.filter(c => c.status === "pool");

  return (
    <div className="flex-1 flex flex-col overflow-hidden w-full bg-background relative">
      <div className="border-b border-border bg-card/50 px-8 pb-8 h-[256px] flex flex-col justify-end flex-shrink-0">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
          <h1 className="text-3xl font-heading font-semibold tracking-tight text-foreground">Candidate Discovery</h1>
          <p className="text-muted-foreground max-w-xl">
            Explore thematic subsets of the candidate pool or use natural language to surface the exact profile you need to hire.
          </p>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="e.g. Find Enterprise AEs from companies that IPO'd, experienced in MEDDPICC..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-border px-12 py-4 text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-none shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto w-full p-8">
        <div className="max-w-5xl mx-auto h-full">
          {query.trim().length > 0 ? (
            <div className="space-y-6">
              <div className="text-sm font-mono text-muted-foreground mb-4">
                Searching for: <span className="text-primary">"{query}"</span> — {poolCandidates.length} potential matches
              </div>
              <div className="grid grid-cols-1 gap-6">
                {poolCandidates.map(c => (
                  <CandidateTriageCard key={c.id} candidate={c} mode="search" />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              <DiscoveryCarousel 
                title="AEs who outperformed quota 2 consecutive quarters"
                slug="outperformed-quota"
                candidates={poolCandidates}
              />
              
              <DiscoveryCarousel 
                title="Enterprise AEs from companies that IPO'd"
                slug="ipo-veterans"
                candidates={poolCandidates.slice().reverse()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
