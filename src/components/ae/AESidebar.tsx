"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Briefcase, Fingerprint, Sliders, MessageSquare, Settings } from "lucide-react";

const navigation = [
  { name: 'Discover', href: '/ae', icon: Compass },
  { name: 'News', href: '/ae/news', icon: Briefcase },
  { name: 'Inbox', href: '/ae/inbox', icon: MessageSquare, count: 2 },
  { name: 'Preferences', href: '/ae/preferences', icon: Sliders },
  { name: 'Activity', href: '/ae/activity', icon: Fingerprint },
];

export function AESidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[280px] h-full bg-zinc-950 border-r border-slate-800 flex flex-col pt-6 font-sans flex-shrink-0">
      {/* Brand & Context */}
      <div className="px-6 mb-8 mt-2">
        <Link href="/ae" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <span className="text-zinc-900 font-bold text-lg font-heading leading-none">AE</span>
          </div>
          <span className="text-white font-semibold text-xl tracking-tight">AccountExecutive</span>
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex justify-center items-center">
            <span className="text-emerald-500 font-bold text-sm">JS</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">John Smith</p>
            <p className="text-[10px] uppercase tracking-wider text-emerald-500 font-mono mt-0.5">Top 5% Performer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-3 mb-4 mt-8">
          Candidate Portal
        </div>
        
        {navigation.map((item) => {
          // simple active matching
          const isActive = pathname === item.href || (item.href !== '/ae' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-zinc-900 text-white border border-slate-800/50' 
                  : 'text-slate-400 hover:text-white hover:bg-zinc-900/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${isActive ? 'text-emerald-500' : ''}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {item.count}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account Settings */}
      <div className="p-4 border-t border-slate-800">
        <Link 
          href="/ae/settings" 
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-400 hover:text-white hover:bg-zinc-900/50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Account Settings</span>
        </Link>
      </div>
    </div>
  );
}
