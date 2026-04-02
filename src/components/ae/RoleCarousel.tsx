"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RoleTriageCard } from "./RoleTriageCard";
import { Role } from "@/lib/mock-roles";

interface Props {
  title: string;
  slug: string;
  roles: Role[];
}

export function RoleCarousel({ title, slug, roles }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 424; // 400px min-w-[400px] + 24px gap-6
      
      if (direction === "left") {
        if (scrollLeft <= 0) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-xl font-heading font-medium text-white">{title}</h2>
        <button className="text-xs font-mono text-emerald-500 hover:text-emerald-400 uppercase tracking-widest transition-colors font-semibold">
          View All
        </button>
      </div>

      <div className="relative group">
        <button 
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-slate-800 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 hover:text-white transition-all z-10 hover:scale-110 shadow-xl"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
          {roles.map(role => (
            <div key={role.id} className="min-w-[400px] snap-center">
              <RoleTriageCard role={role} />
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinc-900 border border-slate-800 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 hover:text-white transition-all z-10 hover:scale-110 shadow-xl"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
