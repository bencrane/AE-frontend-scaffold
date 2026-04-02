"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Compass, Briefcase, Building, Globe, Settings } from 'lucide-react';

export function CompanySidebar() {
  const pathname = usePathname() || "";
  
  const isCompanyRoot = pathname === '/company' || pathname === '/company/';
  const isDiscover = pathname.startsWith('/company/discover');
  const isRoles = pathname.startsWith('/company/roles');
  const isProfile = pathname.startsWith('/company/profile');
  const isIntelligence = pathname.startsWith('/company/intelligence');

  return (
    <div className="w-64 border-r border-border bg-background min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight text-white">
          Account<span className="text-primary">Executive</span>.com
        </Link>
      </div>
      <div className="p-4 flex-1">
        <nav className="space-y-1 mt-2">
          <Link 
            href="/company" 
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isCompanyRoot ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <LayoutDashboard className={`w-4 h-4 ${isCompanyRoot ? 'text-primary' : ''}`} />
            Inbound Queue
            <span className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full ${isCompanyRoot ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>3</span>
          </Link>
          <Link 
            href="/company/discover" 
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isDiscover ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Compass className={`w-4 h-4 ${isDiscover ? 'text-primary' : ''}`} />
            Candidate Discovery
          </Link>
          <Link 
            href="/company/roles" 
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isRoles ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Briefcase className={`w-4 h-4 ${isRoles ? 'text-primary' : ''}`} />
            Your Roles
          </Link>
          <Link 
            href="/company/profile" 
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isProfile ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Building className={`w-4 h-4 ${isProfile ? 'text-primary' : ''}`} />
            Company Page
          </Link>
          <Link 
            href="/company/intelligence" 
            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
              isIntelligence ? 'text-foreground bg-secondary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            }`}
          >
            <Globe className={`w-4 h-4 ${isIntelligence ? 'text-primary' : ''}`} />
            Intelligence
          </Link>
        </nav>
      </div>
      <div className="p-4 border-t border-border mt-auto flex items-center justify-between group cursor-pointer hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary font-mono text-xs border border-primary/30">
            VP
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium truncate">Acme Corp VP Sales</div>
            <div className="text-xs text-muted-foreground font-mono">Active Sub</div>
          </div>
        </div>
        <Settings className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  );
}
