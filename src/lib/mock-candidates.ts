export interface Candidate {
  id: string;
  status: "pending_inbound" | "routed" | "passed" | "pool";
  anonymized_alias: string;
  current_role: {
    title: string;
    segment: string;
    company_stage: string;
    company_tier: string;
  };
  metrics: {
    avg_quota_attainment: number; // decimal percentage e.g. 1.15
    avg_deal_size: number;
    sales_cycle: number;
    methodologies: string[];
    tech_stack: string[];
  };
  target_ote: number;
  expressed_interest_in_role?: string;
  match_score: number;
  time_in_role_months: number;
}

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    status: "pending_inbound",
    anonymized_alias: "Candidate #8492",
    current_role: {
      title: "Enterprise Account Executive",
      segment: "Enterprise",
      company_stage: "Series C",
      company_tier: "Tier 1",
    },
    metrics: {
      avg_quota_attainment: 1.12,
      avg_deal_size: 150000,
      sales_cycle: 115,
      methodologies: ["MEDDPICC", "Command of the Message"],
      tech_stack: ["Salesforce", "Gong", "Clari"],
    },
    target_ote: 300000,
    expressed_interest_in_role: "Strategic Account Executive",
    match_score: 98,
    time_in_role_months: 28,
  },
  {
    id: "cand-2",
    status: "pending_inbound",
    anonymized_alias: "Candidate #3301",
    current_role: {
      title: "Mid-Market AE",
      segment: "Mid-Market",
      company_stage: "Series A",
      company_tier: "Tier 2",
    },
    metrics: {
      avg_quota_attainment: 0.94,
      avg_deal_size: 45000,
      sales_cycle: 60,
      methodologies: ["Sandler"],
      tech_stack: ["HubSpot", "Outreach", "ZoomInfo"],
    },
    target_ote: 180000,
    expressed_interest_in_role: "Senior Mid-Market AE",
    match_score: 75,
    time_in_role_months: 18,
  },
  {
    id: "cand-3",
    status: "pending_inbound",
    anonymized_alias: "Candidate #9921",
    current_role: {
      title: "Strategic AE",
      segment: "Strategic",
      company_stage: "Public",
      company_tier: "Tier 1",
    },
    metrics: {
      avg_quota_attainment: 1.35,
      avg_deal_size: 350000,
      sales_cycle: 180,
      methodologies: ["MEDDIC", "Challenger"],
      tech_stack: ["Salesforce", "Gong", "Clari"],
    },
    target_ote: 400000,
    expressed_interest_in_role: "Strategic Account Executive",
    match_score: 82,
    time_in_role_months: 36,
  },
  {
    id: "cand-4",
    status: "pool",
    anonymized_alias: "Candidate #1105",
    current_role: { title: "Senior SMB AE", segment: "SMB", company_stage: "Series B", company_tier: "Tier 1" },
    metrics: { avg_quota_attainment: 1.05, avg_deal_size: 15000, sales_cycle: 30, methodologies: ["Challenger"], tech_stack: ["Salesforce", "Outreach"] },
    target_ote: 150000, match_score: 0, time_in_role_months: 14,
  },
  {
    id: "cand-5",
    status: "pool",
    anonymized_alias: "Candidate #8842",
    current_role: { title: "Enterprise AE", segment: "Enterprise", company_stage: "Public", company_tier: "Tier 1" },
    metrics: { avg_quota_attainment: 1.18, avg_deal_size: 280000, sales_cycle: 140, methodologies: ["MEDDPICC"], tech_stack: ["Salesforce", "Gong"] },
    target_ote: 280000, match_score: 0, time_in_role_months: 32,
  },
  {
    id: "cand-6",
    status: "pool",
    anonymized_alias: "Candidate #3210",
    current_role: { title: "Mid-Market AE", segment: "Mid-Market", company_stage: "Series C", company_tier: "Tier 2" },
    metrics: { avg_quota_attainment: 1.02, avg_deal_size: 65000, sales_cycle: 45, methodologies: ["Sandler", "SPIN"], tech_stack: ["HubSpot"] },
    target_ote: 175000, match_score: 0, time_in_role_months: 11,
  },
  {
    id: "cand-7",
    status: "pool",
    anonymized_alias: "Candidate #5531",
    current_role: { title: "Strategic AE", segment: "Strategic", company_stage: "Series D", company_tier: "Tier 1" },
    metrics: { avg_quota_attainment: 1.40, avg_deal_size: 550000, sales_cycle: 180, methodologies: ["Command of the Message"], tech_stack: ["Salesforce", "Clari"] },
    target_ote: 350000, match_score: 0, time_in_role_months: 24,
  }
];
