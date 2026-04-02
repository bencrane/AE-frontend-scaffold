"use client";

import React, { useState } from 'react';
import { 
  Briefcase, 
  RefreshCcw, 
  Plus, 
  MoreVertical, 
  Eye, 
  Bookmark, 
  Users, 
  Unlock,
  CheckCircle2,
  AlertCircle,
  PauseCircle,
  Link as LinkIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/Card'; // Oh wait, I need to check how Card is exported. Let's stick to simple divs if I don't know the Card path, or I'll just use standard HTML structure with tailwind.

// Mock Data
const MOCK_ROLES = [
  {
    id: "r_1001",
    title: "Strategic Account Executive",
    status: "active",
    type: "Enterprise",
    base: "$150k",
    ote: "$300k",
    source: "Greenhouse",
    sourceStatus: "synced",
    metrics: {
      views: 1245,
      saves: 84,
      interest: 12,
      unlocks: 3
    },
    lastUpdated: "2h ago"
  },
  {
    id: "r_1002",
    title: "Mid-Market Account Executive",
    status: "active",
    type: "Mid-Market",
    base: "$120k",
    ote: "$240k",
    source: "Greenhouse",
    sourceStatus: "synced",
    metrics: {
      views: 3890,
      saves: 215,
      interest: 45,
      unlocks: 8
    },
    lastUpdated: "2h ago"
  },
  {
    id: "r_1003",
    title: "Account Executive, EMEA",
    status: "paused",
    type: "Enterprise",
    base: "£100k",
    ote: "£200k",
    source: "Manual",
    sourceStatus: "offline",
    metrics: {
      views: 450,
      saves: 12,
      interest: 3,
      unlocks: 0
    },
    lastUpdated: "3d ago"
  },
  {
    id: "r_1004",
    title: "SMB Account Executive",
    status: "draft",
    type: "SMB",
    base: "$80k",
    ote: "$160k",
    source: "Greenhouse",
    sourceStatus: "synced",
    metrics: {
      views: 0,
      saves: 0,
      interest: 0,
      unlocks: 0
    },
    lastUpdated: "1h ago"
  }
];

export default function CompanyRolesPage() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] uppercase tracking-wider font-mono font-medium"><CheckCircle2 className="w-3 h-3" /> Active</span>;
      case 'paused':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] uppercase tracking-wider font-mono font-medium"><PauseCircle className="w-3 h-3" /> Paused</span>;
      case 'draft':
        return <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-slate-500/10 border border-slate-500/20 text-slate-400 text-[11px] uppercase tracking-wider font-mono font-medium"><AlertCircle className="w-3 h-3" /> Draft</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-8 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-serif text-4xl text-slate-50">Your Roles</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Manage your active pipeline requirements. Roles synced from your ATS are automatically populated to candidate feeds.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="bg-zinc-900 border-slate-800 hover:bg-zinc-800 text-slate-200 h-10 px-4 rounded-none font-sans"
              onClick={handleSync}
              disabled={isSyncing}
            >
              <RefreshCcw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
              {isSyncing ? 'Syncing...' : 'Sync ATS'}
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 h-10 px-4 rounded-none font-sans font-medium transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
          </div>
        </div>

        {/* Telemetry Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-slate-800 p-5 space-y-3">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              Active Roles
              <Briefcase className="w-4 h-4 text-emerald-500/50" />
            </div>
            <div className="text-3xl font-mono text-slate-50">
              2<span className="text-slate-500 text-lg ml-1">/ 4</span>
            </div>
          </div>
          <div className="bg-zinc-900 border border-slate-800 p-5 space-y-3">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              Total Pipeline Views
              <Eye className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-3xl font-mono text-slate-50">
              5,135
            </div>
          </div>
          <div className="bg-zinc-900 border border-slate-800 p-5 space-y-3">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              Pending Candidates
              <Users className="w-4 h-4 text-emerald-500/50" />
            </div>
            <div className="text-3xl font-mono text-slate-50">
              57
            </div>
          </div>
          <div className="bg-zinc-900 border border-slate-800 p-5 space-y-3">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider flex items-center justify-between">
              ATS Status
              <LinkIcon className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-sm text-emerald-400">Greenhouse Connected</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">Last sync: 2h ago</div>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-zinc-900 border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-zinc-950/50">
                  <th className="py-4 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider w-[40%]">Role Details</th>
                  <th className="py-4 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Compensation</th>
                  <th className="py-4 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider">Source</th>
                  <th className="py-4 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider text-right">Pipeline</th>
                  <th className="py-4 px-5 text-xs font-medium text-slate-400 uppercase tracking-wider w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_ROLES.map((role) => (
                  <tr key={role.id} className="hover:bg-zinc-800/50 transition-colors group">
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-sans font-semibold text-slate-50 text-base">{role.title}</span>
                          {getStatusBadge(role.status)}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                          <span>{role.id}</span>
                          <span>&bull;</span>
                          <span>{role.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-1 font-mono text-sm">
                        <div className="flex items-center justify-between max-w-[120px]">
                          <span className="text-slate-500">OTE:</span>
                          <span className="text-slate-200">{role.ote}</span>
                        </div>
                        <div className="flex items-center justify-between max-w-[120px]">
                          <span className="text-slate-500">Base:</span>
                          <span className="text-slate-300">{role.base}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${role.sourceStatus === 'synced' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                        <span className="text-sm font-sans text-slate-300">{role.source}</span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-1">L:{role.lastUpdated}</div>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-5">
                        <div className="flex flex-col items-center gap-1 group-hover:text-emerald-400/80 transition-colors" title="Views">
                          <Eye className="w-4 h-4 text-slate-500" />
                          <span className="font-mono text-xs text-slate-400">{role.metrics.views.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1" title="Saves">
                          <Bookmark className="w-4 h-4 text-slate-500" />
                          <span className="font-mono text-xs text-slate-400">{role.metrics.saves.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1" title="Expressed Interest">
                          <Users className="w-4 h-4 text-slate-500" />
                          <span className="font-mono text-xs text-slate-400">{role.metrics.interest.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-center gap-1" title="Unlocked Candidates">
                          <Unlock className="w-4 h-4 text-emerald-500/70" />
                          <span className="font-mono text-xs text-emerald-400">{role.metrics.unlocks.toLocaleString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-right w-16">
                      <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-200">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
