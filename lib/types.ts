export type FilingStatus = "single" | "married" | "head_of_household";
export type EntityType = "none" | "sole_prop" | "llc" | "s_corp";
export type StrategyStatus = "recommended" | "considering" | "later";

export interface TaxDocument {
  id: string;
  name: string;
  type: "W-2" | "1099-NEC" | "1099-INT" | "1098";
  status: "parsed" | "review_needed";
  uploadedAt: string;
  parsedFields: {
    wages: number;
    federalWithholding: number;
    stateWithholding: number;
    employerOrPayer: string;
    ein: string;
  };
}

export interface TaxProfile {
  filingStatus: FilingStatus;
  dependents: number;
  state: string;
  w2Income: number;
  income1099: number;
  businessIncome: number;
  rentalIncome: number;
  investmentIncome: number;
  lifeEvents: string[];
  entityType: EntityType;
  homeOffice: boolean;
  vehicleUse: boolean;
}

export interface DeductionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  qualifies: string;
  estimatedSavings: number;
  actionItems: string[];
  eligible: boolean;
}

export interface StrategyItem {
  id: string;
  name: string;
  whoItsFor: string;
  explanation: string;
  estimatedSavings: number;
  fitScore: number;
  steps: string[];
  status: StrategyStatus;
}

export interface LearnArticle {
  id: string;
  category: "Tax 101" | "Strategies" | "Wealth Building" | "Glossary";
  title: string;
  summary: string;
  readTime: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: string[];
  createdAt: string;
}

export interface YearSnapshot {
  year: number;
  income: number;
  deductions: number;
  tax: number;
}
