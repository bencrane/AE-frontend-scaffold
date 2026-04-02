export interface Company {
  id: string;
  name: string;
  stage: string; // e.g. "Series A", "Public"
  tier: string; // e.g. "Tier 1" 
  logo_url?: string;
  is_paying_customer: boolean;
}

export interface Role {
  id: string;
  title_level: string;
  company: Company;
  segment: "Enterprise" | "Mid-Market" | "SMB" | "Strategic";
  location: string;
  compensation: {
    ote: number;
    base: number;
    equity?: string;
  };
  operational_metrics: {
    quota_attainment: number; // decimal percentage e.g. 0.75 for 75%
    deal_size: number;
    sales_cycle: number; // in days
    methodology: string[];
    tech_stack: string[];
  };
  posted_at: string;
}

export const mockCompanies: Company[] = [
  {
    id: "c-1",
    name: "Rippling",
    stage: "Series F",
    tier: "Tier 1",
    is_paying_customer: true,
  },
  {
    id: "c-2",
    name: "Acme Corp",
    stage: "Series A",
    tier: "Tier 2",
    is_paying_customer: false,
  },
  {
    id: "c-3",
    name: "Gong",
    stage: "Series E",
    tier: "Tier 1",
    is_paying_customer: true,
  },
  {
    id: "c-4",
    name: "Vanta",
    stage: "Series C",
    tier: "Tier 1",
    is_paying_customer: false,
  }
];

export const mockRoles: Role[] = [
  {
    id: "r-1",
    title_level: "Enterprise Account Executive",
    company: mockCompanies[0],
    segment: "Enterprise",
    location: "San Francisco / Remote",
    compensation: {
      ote: 300000,
      base: 150000,
      equity: "0.01% - 0.05%"
    },
    operational_metrics: {
      quota_attainment: 0.68,
      deal_size: 85000,
      sales_cycle: 90,
      methodology: ["MEDDPICC", "Command of the Message"],
      tech_stack: ["Salesforce", "Gong", "Outreach"]
    },
    posted_at: "2026-03-28T10:00:00Z"
  },
  {
    id: "r-2",
    title_level: "Mid-Market AE",
    company: mockCompanies[1],
    segment: "Mid-Market",
    location: "New York / Remote",
    compensation: {
      ote: 220000,
      base: 110000,
      equity: "0.1% - 0.25%"
    },
    operational_metrics: {
      quota_attainment: 0.45,
      deal_size: 35000,
      sales_cycle: 45,
      methodology: ["Sandler"],
      tech_stack: ["HubSpot", "Apollo"]
    },
    posted_at: "2026-04-01T08:30:00Z"
  },
  {
    id: "r-3",
    title_level: "Strategic Account Executive",
    company: mockCompanies[2],
    segment: "Strategic",
    location: "Remote (US)",
    compensation: {
      ote: 350000,
      base: 175000,
    },
    operational_metrics: {
      quota_attainment: 0.72,
      deal_size: 150000,
      sales_cycle: 120,
      methodology: ["MEDDPICC"],
      tech_stack: ["Salesforce", "Gong", "Clari", "SalesLoft"]
    },
    posted_at: "2026-04-02T09:15:00Z"
  },
  {
    id: "r-4",
    title_level: "SMB Account Executive",
    company: mockCompanies[3],
    segment: "SMB",
    location: "Austin, TX",
    compensation: {
      ote: 160000,
      base: 80000,
    },
    operational_metrics: {
      quota_attainment: 0.85,
      deal_size: 12000,
      sales_cycle: 21,
      methodology: ["Challenger"],
      tech_stack: ["Salesforce", "Outreach", "Chili Piper"]
    },
    posted_at: "2026-03-30T14:20:00Z"
  },
  {
    id: "r-5",
    title_level: "Senior Enterprise AE",
    company: mockCompanies[3],
    segment: "Enterprise",
    location: "Remote (Global)",
    compensation: {
      ote: 320000,
      base: 160000,
    },
    operational_metrics: {
      quota_attainment: 0.65,
      deal_size: 110000,
      sales_cycle: 105,
      methodology: ["MEDDIC"],
      tech_stack: ["Salesforce", "Gong", "ZoomInfo"]
    },
    posted_at: "2026-04-02T11:00:00Z"
  }
];
