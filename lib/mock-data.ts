import type {
  ChatMessage,
  DeductionItem,
  LearnArticle,
  StrategyItem,
  TaxDocument,
  TaxProfile,
  YearSnapshot
} from "@/lib/types";

export const initialProfile: TaxProfile = {
  filingStatus: "married",
  dependents: 2,
  state: "Texas",
  w2Income: 112000,
  income1099: 24000,
  businessIncome: 36000,
  rentalIncome: 18000,
  investmentIncome: 8200,
  lifeEvents: ["New baby", "Bought a primary home", "Changed jobs"],
  entityType: "llc",
  homeOffice: true,
  vehicleUse: true
};

export const initialDocuments: TaxDocument[] = [
  {
    id: "doc-1",
    name: "AcmeTech_W2_2024.pdf",
    type: "W-2",
    status: "parsed",
    uploadedAt: "2025-02-01T10:30:00.000Z",
    parsedFields: {
      wages: 112000,
      federalWithholding: 17200,
      stateWithholding: 0,
      employerOrPayer: "AcmeTech Inc.",
      ein: "12-3456789"
    }
  },
  {
    id: "doc-2",
    name: "BrightLane_1099-NEC_2024.pdf",
    type: "1099-NEC",
    status: "parsed",
    uploadedAt: "2025-02-03T14:12:00.000Z",
    parsedFields: {
      wages: 24000,
      federalWithholding: 2100,
      stateWithholding: 0,
      employerOrPayer: "BrightLane Digital LLC",
      ein: "98-7654321"
    }
  }
];

export const deductionCatalog: DeductionItem[] = [
  {
    id: "ded-1",
    category: "Business Owner",
    title: "Home Office Deduction",
    description: "Deduct a portion of rent, utilities, and internet used exclusively for business.",
    qualifies: "You run a business from a dedicated home office.",
    estimatedSavings: 1850,
    actionItems: ["Measure dedicated office square footage", "Gather utility bills", "Track business-use percentage"],
    eligible: true
  },
  {
    id: "ded-2",
    category: "Self-employed",
    title: "Vehicle Mileage",
    description: "Deduct miles driven for client work, meetings, and business errands.",
    qualifies: "You drive your personal vehicle for business purposes.",
    estimatedSavings: 1320,
    actionItems: ["Export mileage log", "Separate personal trips", "Apply IRS standard mileage rate"],
    eligible: true
  },
  {
    id: "ded-3",
    category: "Family",
    title: "Child and Dependent Care Credit",
    description: "Claim eligible childcare expenses incurred while you worked.",
    qualifies: "You paid for qualifying dependent care for children under 13.",
    estimatedSavings: 1200,
    actionItems: ["Collect provider EIN", "Confirm qualifying expenses", "Retain payment records"],
    eligible: true
  },
  {
    id: "ded-4",
    category: "Homeowner",
    title: "Mortgage Interest Deduction",
    description: "Deduct interest paid on qualifying mortgage debt for your primary home.",
    qualifies: "You itemize and received Form 1098 from lender.",
    estimatedSavings: 2700,
    actionItems: ["Upload Form 1098", "Confirm principal balance limits", "Compare standard vs itemized"],
    eligible: true
  },
  {
    id: "ded-5",
    category: "Education",
    title: "Lifetime Learning Credit",
    description: "Offset tax from eligible tuition and fees for professional coursework.",
    qualifies: "You paid qualified tuition for eligible education.",
    estimatedSavings: 800,
    actionItems: ["Collect Form 1098-T", "Track out-of-pocket tuition", "Verify MAGI thresholds"],
    eligible: false
  },
  {
    id: "ded-6",
    category: "Charitable",
    title: "Non-cash Donation Deduction",
    description: "Deduct donated household goods and appreciated assets with proper substantiation.",
    qualifies: "You donated to qualified 501(c)(3) organizations.",
    estimatedSavings: 620,
    actionItems: ["Collect receipts", "Document fair market value", "Complete Form 8283 if needed"],
    eligible: true
  }
];

export const initialStrategies: StrategyItem[] = [
  {
    id: "strat-1",
    name: "S-Corp Election",
    whoItsFor: "Owners with consistent net profit above ~$60k",
    explanation: "Split income between salary and distributions to reduce self-employment taxes.",
    estimatedSavings: 6400,
    fitScore: 84,
    steps: ["Estimate annual net profit", "Run salary reasonableness analysis", "File Form 2553 before deadline"],
    status: "recommended"
  },
  {
    id: "strat-2",
    name: "Solo 401(k) + Backdoor Roth",
    whoItsFor: "High earners with self-employment income",
    explanation: "Stack pre-tax and Roth buckets to lower current taxes and grow long-term wealth.",
    estimatedSavings: 9800,
    fitScore: 90,
    steps: ["Open Solo 401(k)", "Calculate employee + employer contribution room", "Execute Backdoor Roth pro-rata check"],
    status: "recommended"
  },
  {
    id: "strat-3",
    name: "HSA Triple Tax Advantage",
    whoItsFor: "Families on HSA-eligible HDHP plans",
    explanation: "Contributions are deductible, growth is tax-free, and qualified withdrawals are tax-free.",
    estimatedSavings: 2150,
    fitScore: 75,
    steps: ["Confirm HDHP eligibility", "Max annual contribution", "Invest HSA balance long-term"],
    status: "considering"
  },
  {
    id: "strat-4",
    name: "Hire Your Kids",
    whoItsFor: "Business owners with children doing legitimate work",
    explanation: "Shift income to lower brackets while teaching financial skills.",
    estimatedSavings: 1800,
    fitScore: 68,
    steps: ["Define age-appropriate job duties", "Set market-rate payroll", "Keep time logs and documentation"],
    status: "later"
  },
  {
    id: "strat-5",
    name: "Augusta Rule (Section 280A)",
    whoItsFor: "Owners who can rent their home for business meetings",
    explanation: "Rent your home to your business up to 14 days/year tax-free personally.",
    estimatedSavings: 2400,
    fitScore: 72,
    steps: ["Set fair market daily rate", "Draft meeting minutes", "Issue business payment + retain support"],
    status: "considering"
  }
];

export const learnContent: LearnArticle[] = [
  {
    id: "learn-1",
    category: "Tax 101",
    title: "How Marginal Tax Brackets Actually Work",
    summary: "Avoid the common myth: only each additional dollar is taxed at the higher bracket.",
    readTime: "6 min"
  },
  {
    id: "learn-2",
    category: "Strategies",
    title: "QBI 20% Deduction Explained",
    summary: "Understand thresholds, SSTB limits, and how entity choices impact QBI benefits.",
    readTime: "9 min"
  },
  {
    id: "learn-3",
    category: "Wealth Building",
    title: "Tax Buckets for Financial Freedom",
    summary: "Coordinate taxable, tax-deferred, and tax-free accounts for lifetime optimization.",
    readTime: "11 min"
  },
  {
    id: "learn-4",
    category: "Glossary",
    title: "Cost Segregation",
    summary: "A method that accelerates depreciation on components of real estate property.",
    readTime: "3 min"
  },
  {
    id: "learn-5",
    category: "Strategies",
    title: "1031 Exchange Basics",
    summary: "Defer capital gains taxes by exchanging qualified investment properties.",
    readTime: "8 min"
  }
];

export const initialChat: ChatMessage[] = [
  {
    id: "chat-1",
    role: "assistant",
    content:
      "Welcome to TaxIQ demo mode. I can help explain deductions, compare strategy options, and suggest next actions from your profile.",
    citations: ["IRC §62", "IRS Pub 535"],
    createdAt: new Date().toISOString()
  }
];

export const priorYears: YearSnapshot[] = [
  { year: 2022, income: 136000, deductions: 21000, tax: 24400 },
  { year: 2023, income: 154000, deductions: 24600, tax: 26100 },
  { year: 2024, income: 198200, deductions: 33800, tax: 27300 }
];

export const lifeEventOptions = [
  "Married",
  "New baby",
  "Bought a primary home",
  "Changed jobs",
  "Started a business",
  "Moved states"
];
