export type Role = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyStage: string;
  companySector: string;
  metrics: {
    targetOte: number;
    base: number;
    avgDealSize: number;
    salesCycle: number;
    quotaAttainment: number; // percentage
  };
  dna: {
    methodology: string[];
    stack: string[];
  };
};

export const mockRoles: Role[] = [
  {
    id: "r100",
    title: "Strategic Account Executive",
    companyId: "c1",
    companyName: "Acme Corp",
    companyStage: "Series C",
    companySector: "Data Infrastructure",
    metrics: {
      targetOte: 320000,
      base: 160000,
      avgDealSize: 75000,
      salesCycle: 60,
      quotaAttainment: 68,
    },
    dna: {
      methodology: ["MEDDPICC", "Command of the Message"],
      stack: ["Salesforce", "Clari", "Gong"],
    }
  },
  {
    id: "r101",
    title: "Enterprise AE, FinServ",
    companyId: "c2",
    companyName: "Stripe",
    companyStage: "Public",
    companySector: "Fintech",
    metrics: {
      targetOte: 350000,
      base: 175000,
      avgDealSize: 150000,
      salesCycle: 120,
      quotaAttainment: 55,
    },
    dna: {
      methodology: ["Challenger"],
      stack: ["Salesforce", "Internal", "Outreach"],
    }
  },
  {
    id: "r102",
    title: "Senior AE, Mid-Market",
    companyId: "c3",
    companyName: "Vercel",
    companyStage: "Series D",
    companySector: "DevTools",
    metrics: {
      targetOte: 250000,
      base: 125000,
      avgDealSize: 35000,
      salesCycle: 45,
      quotaAttainment: 72,
    },
    dna: {
      methodology: ["SPIN", "Sandler"],
      stack: ["HubSpot", "Apollo"],
    }
  },
  {
    id: "r103",
    title: "Enterprise Account Executive",
    companyId: "c4",
    companyName: "Anthropic",
    companyStage: "Series C",
    companySector: "AI",
    metrics: {
      targetOte: 400000,
      base: 200000,
      avgDealSize: 250000,
      salesCycle: 180,
      quotaAttainment: 85,
    },
    dna: {
      methodology: ["MEDDPICC"],
      stack: ["Salesforce", "Clari"],
    }
  },
  {
    id: "r104",
    title: "Key Account Director",
    companyId: "c5",
    companyName: "Rippling",
    companyStage: "Series E",
    companySector: "HR Tech",
    metrics: {
      targetOte: 300000,
      base: 150000,
      avgDealSize: 85000,
      salesCycle: 75,
      quotaAttainment: 82,
    },
    dna: {
      methodology: ["Sandler"],
      stack: ["Salesforce", "Gong", "Chili Piper"],
    }
  },
  {
    id: "r105",
    title: "Strategic AE, West",
    companyId: "c6",
    companyName: "Databricks",
    companyStage: "Series H",
    companySector: "Data Infra",
    metrics: {
      targetOte: 420000,
      base: 210000,
      avgDealSize: 450000,
      salesCycle: 210,
      quotaAttainment: 60,
    },
    dna: {
      methodology: ["MEDDPICC", "Command of the Message"],
      stack: ["Salesforce", "Clari", "Tableau"],
    }
  },
  {
    id: "r106",
    title: "Enterprise AE",
    companyId: "c7",
    companyName: "Gong",
    companyStage: "Series E",
    companySector: "Sales Tech",
    metrics: {
      targetOte: 280000,
      base: 140000,
      avgDealSize: 65000,
      salesCycle: 45,
      quotaAttainment: 75,
    },
    dna: {
      methodology: ["Challenger"],
      stack: ["Gong", "Salesforce"],
    }
  },
  {
    id: "r107",
    title: "Commercial AE",
    companyId: "c8",
    companyName: "Notion",
    companyStage: "Series C",
    companySector: "Productivity",
    metrics: {
      targetOte: 200000,
      base: 100000,
      avgDealSize: 15000,
      salesCycle: 30,
      quotaAttainment: 88,
    },
    dna: {
      methodology: ["SPIN"],
      stack: ["Notion", "HubSpot", "Apollo"],
    }
  }
];
