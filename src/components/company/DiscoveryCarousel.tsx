"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CandidateTriageCard } from "@/components/company/CandidateTriageCard";
import { Candidate } from "@/lib/mock-candidates";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DiscoveryCarousel({ title, slug, candidates }: { title: string, slug: string, candidates: Candidate[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Duplicate array 10 times to give the illusion of infinite scroll
  // (In a real app, you'd use a robust virtualized circular buffer)
  const items = Array(10).fill(candidates).flat();

  const scrollNext = () => {
    if (trackRef.current) {
      // scroll by roughly one card + gap
      trackRef.current.scrollBy({ left: 566, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -566, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    
    // If we hit the absolute end, snap back silently to the middle equivalent
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
       trackRef.current.scrollTo({ left: scrollWidth / 2, behavior: 'instant' });
    }
    // If we hit the start, snap to the middle equivalent
    if (scrollLeft <= 5) {
       trackRef.current.scrollTo({ left: scrollWidth / 2, behavior: 'instant' });
    }
  };

  useEffect(() => {
    // start slightly scrolled into the duplications to allow left-scrolling immediately
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: trackRef.current.scrollWidth / 2, behavior: 'instant' });
    }
  }, []);

  return (
    <div className="space-y-4 group relative">
      <div className="flex justify-between items-end border-b border-border/50 pb-2">
        <h2 className="text-lg font-heading font-semibold">{title}</h2>
        <Link href={`/company/discover/${slug}`} className="text-xs font-mono text-primary uppercase tracking-widest hover:underline">
          View all
        </Link>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Navigation Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="icon" className="rounded-full bg-background shadow-md border-border h-10 w-10 pointer-events-auto ml-1" onClick={scrollPrev}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="icon" className="rounded-full bg-background shadow-md border-border h-10 w-10 pointer-events-auto mr-4" onClick={scrollNext}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Track */}
        {/* Using native snap-x and flex spacing for smooth layout */}
        <div 
          ref={trackRef} 
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 pt-2 -mx-2 px-2 select-none touch-pan-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((c, i) => (
            <div key={`${c.id}-${i}`} className="min-w-[550px] max-w-[550px] snap-start shrink-0">
               <CandidateTriageCard candidate={c} mode="search" />
            </div>
          ))}
        </div>

        {/* Global style for hiding scrollbar consistently */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </div>
  );
}
