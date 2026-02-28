export const mockProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  filingStatus: "Married Filing Jointly" as const,
  dependents: 2,
  state: "California",
  occupation: "Software Engineer & Freelance Consultant",
  incomes: [
    { type: "W-2", source: "TechCorp Inc.", amount: 145000 },
    { type: "1099-NEC", source: "Freelance Consulting", amount: 62000 },
    { type: "1099-DIV", source: "Vanguard Investments", amount: 3200 },
    { type: "1099-INT", source: "Chase Savings", amount: 850 },
  ],
  totalIncome: 211050,
  lifeEvents: ["Had a baby", "Started a side business"],
  businessDetails: {
    entityType: "Sole Proprietor",
    homeOffice: true,
    homeOfficeSquareFeet: 250,
    vehicleForBusiness: true,
    businessMiles: 4800,
  },
};

export const mockDocuments = [
  {
    id: "doc-1",
    name: "W-2_TechCorp_2025.pdf",
    type: "W-2" as const,
    uploadedAt: "2026-01-15",
    status: "parsed" as const,
    data: {
      employer: "TechCorp Inc.",
      ein: "12-3456789",
      wages: 145000,
      federalWithheld: 28500,
      stateWithheld: 11200,
      socialSecurity: 9114,
      medicare: 2102.5,
    },
  },
  {
    id: "doc-2",
    name: "1099-NEC_Consulting_2025.pdf",
    type: "1099-NEC" as const,
    uploadedAt: "2026-01-18",
    status: "parsed" as const,
    data: {
      payer: "Various Clients",
      nonemployeeCompensation: 62000,
    },
  },
  {
    id: "doc-3",
    name: "1099-DIV_Vanguard_2025.pdf",
    type: "1099-DIV" as const,
    uploadedAt: "2026-01-20",
    status: "parsed" as const,
    data: {
      payer: "Vanguard Investments",
      ordinaryDividends: 3200,
      qualifiedDividends: 2800,
    },
  },
];

export const mockDeductions = [
  {
    id: "ded-1",
    category: "Self-Employed",
    name: "Home Office Deduction",
    description:
      "Deduct a portion of your rent/mortgage, utilities, and insurance based on the percentage of your home used for business.",
    whoQualifies:
      "Self-employed individuals who use a dedicated space in their home regularly and exclusively for business.",
    estimatedSavings: 4200,
    actionItems: [
      "Measure your home office space (250 sq ft)",
      "Calculate percentage of home used (250/2000 = 12.5%)",
      "Gather utility bills, rent/mortgage statements, insurance docs",
      "Choose simplified method ($5/sq ft, max 300 sq ft) or regular method",
    ],
    claimed: true,
  },
  {
    id: "ded-2",
    category: "Self-Employed",
    name: "Self-Employment Tax Deduction",
    description:
      "Deduct the employer-equivalent portion of your self-employment tax (50% of SE tax).",
    whoQualifies: "Anyone with net self-employment income over $400.",
    estimatedSavings: 4383,
    actionItems: [
      "Calculate net self-employment income ($62,000)",
      "SE tax = 15.3% × 92.35% of net income",
      "Deduct 50% of SE tax on Form 1040",
    ],
    claimed: true,
  },
  {
    id: "ded-3",
    category: "Self-Employed",
    name: "Business Vehicle Deduction",
    description:
      "Deduct business use of your vehicle using standard mileage rate (70 cents/mile for 2025) or actual expenses.",
    whoQualifies:
      "Self-employed who use personal vehicle for business travel (not commuting).",
    estimatedSavings: 3360,
    actionItems: [
      "Review mileage log (4,800 business miles)",
      "Standard mileage: 4,800 × $0.70 = $3,360",
      "Compare with actual expenses method",
      "Keep detailed mileage records going forward",
    ],
    claimed: true,
  },
  {
    id: "ded-4",
    category: "Business Owner",
    name: "Qualified Business Income (QBI) Deduction",
    description:
      "Deduct up to 20% of qualified business income from pass-through entities. This is a huge deduction most people miss.",
    whoQualifies:
      "Self-employed, S-Corp owners, partners, LLC members with taxable income below threshold.",
    estimatedSavings: 12400,
    actionItems: [
      "Calculate qualified business income ($62,000)",
      "20% QBI deduction = $12,400",
      "Verify income is below $383,900 (MFJ) threshold",
      "File Form 8995 or 8995-A",
    ],
    claimed: true,
  },
  {
    id: "ded-5",
    category: "Family",
    name: "Child Tax Credit",
    description:
      "Credit of up to $2,000 per qualifying child under 17. Up to $1,700 is refundable.",
    whoQualifies:
      "Parents/guardians with qualifying children under 17 and income below phase-out.",
    estimatedSavings: 4000,
    actionItems: [
      "Verify children are under 17 at end of tax year",
      "Confirm SSNs for each child",
      "Check income is below $400,000 (MFJ) phase-out",
    ],
    claimed: true,
  },
  {
    id: "ded-6",
    category: "Family",
    name: "Child & Dependent Care Credit",
    description:
      "Credit for expenses paid for care of qualifying children under 13 while you work.",
    whoQualifies:
      "Working parents paying for childcare (daycare, preschool, summer camp, etc.).",
    estimatedSavings: 1200,
    actionItems: [
      "Gather childcare expense receipts",
      "Get provider's tax ID number",
      "File Form 2441",
      "Max $3,000 for one child, $6,000 for two+",
    ],
    claimed: false,
  },
  {
    id: "ded-7",
    category: "Homeowner",
    name: "Mortgage Interest Deduction",
    description:
      "Deduct interest paid on mortgage debt up to $750,000 for homes purchased after Dec 15, 2017.",
    whoQualifies: "Homeowners with a mortgage who itemize deductions.",
    estimatedSavings: 8400,
    actionItems: [
      "Get Form 1098 from mortgage lender",
      "Verify loan balance is under $750,000",
      "Compare total itemized deductions vs standard deduction ($30,000 MFJ)",
    ],
    claimed: true,
  },
  {
    id: "ded-8",
    category: "Homeowner",
    name: "Property Tax Deduction",
    description:
      "Deduct state and local property taxes, subject to $10,000 SALT cap.",
    whoQualifies: "Homeowners who pay property taxes and itemize deductions.",
    estimatedSavings: 3200,
    actionItems: [
      "Get property tax statement from county",
      "Note: combined with state income tax, capped at $10,000 (SALT)",
      "In CA, state income tax alone may exceed cap",
    ],
    claimed: true,
  },
  {
    id: "ded-9",
    category: "Medical",
    name: "HSA Contribution Deduction",
    description:
      "Triple tax advantage: tax-deductible contributions, tax-free growth, tax-free withdrawals for medical expenses.",
    whoQualifies:
      "Enrolled in a high-deductible health plan (HDHP) and not on Medicare.",
    estimatedSavings: 2550,
    actionItems: [
      "Max out HSA contribution: $8,300 (family) for 2025",
      "Invest HSA funds for long-term growth",
      "Keep medical receipts for future tax-free reimbursement",
      "Consider using as stealth retirement account",
    ],
    claimed: false,
  },
  {
    id: "ded-10",
    category: "Charitable",
    name: "Charitable Contribution Deduction",
    description:
      "Deduct donations to qualified 501(c)(3) organizations if you itemize.",
    whoQualifies:
      "Taxpayers who make charitable donations and itemize deductions.",
    estimatedSavings: 1800,
    actionItems: [
      "Gather donation receipts and acknowledgment letters",
      "For donations over $250, get written acknowledgment",
      "Consider donating appreciated stock to avoid capital gains",
      "Track volunteer mileage (14 cents/mile)",
    ],
    claimed: false,
  },
  {
    id: "ded-11",
    category: "Education",
    name: "Lifetime Learning Credit",
    description:
      "Credit of up to $2,000 per return for tuition and fees for higher education courses.",
    whoQualifies:
      "Anyone taking courses at eligible educational institution, no degree requirement.",
    estimatedSavings: 2000,
    actionItems: [
      "Get Form 1098-T from educational institution",
      "Verify MAGI is below $180,000 (MFJ) for full credit",
      "Cannot combine with AOTC for same student",
    ],
    claimed: false,
  },
  {
    id: "ded-12",
    category: "Self-Employed",
    name: "Health Insurance Premium Deduction",
    description:
      "Deduct 100% of health, dental, and long-term care insurance premiums for yourself, spouse, and dependents.",
    whoQualifies:
      "Self-employed who are not eligible for employer-sponsored plan through a spouse's job.",
    estimatedSavings: 5400,
    actionItems: [
      "Calculate total annual premiums paid",
      "Deduction cannot exceed net self-employment income",
      "Deducted on Form 1040, not Schedule C",
    ],
    claimed: true,
  },
];

export const mockStrategies = [
  {
    id: "strat-1",
    name: "Solo 401(k)",
    category: "Retirement",
    summary:
      "As a self-employed consultant, you can contribute up to $69,000/year to a Solo 401(k) — far more than a traditional IRA.",
    whoItsFor: "Self-employed with no employees (spouse can participate)",
    estimatedSavings: 16800,
    explanation:
      "A Solo 401(k) lets you contribute as both employee ($23,000) and employer (25% of net SE income). With $62K in freelance income, you could shelter ~$38,000 from taxes. At your 24% bracket, that's $9,120 in immediate tax savings plus tax-deferred growth.",
    steps: [
      "Open a Solo 401(k) at Fidelity, Schwab, or Vanguard (free)",
      "Calculate max contribution: $23,000 employee + 25% of net SE income",
      "Make contributions before tax filing deadline (April 15 or extension)",
      "Consider Roth Solo 401(k) for tax-free growth",
      "File Form 5500-EZ if plan assets exceed $250K",
    ],
    implemented: false,
    priority: "high" as const,
  },
  {
    id: "strat-2",
    name: "S-Corp Election",
    category: "Entity Structure",
    summary:
      "Elect S-Corp status for your consulting business to save thousands on self-employment tax.",
    whoItsFor:
      "Self-employed earning over $50K/year from freelance/consulting work",
    estimatedSavings: 8200,
    explanation:
      'As a sole proprietor, you pay 15.3% self-employment tax on all net income. With S-Corp election, you pay yourself a "reasonable salary" (~$70K) and take the remaining $-8K as distributions — not subject to SE tax. On $62K freelance income with reasonable salary of $45K, you save SE tax on ~$17K.',
    steps: [
      "File Form 2553 with the IRS (deadline: March 15 for current year)",
      "Set up payroll for reasonable salary (use Gusto or similar)",
      "Pay yourself a W-2 salary of ~$45,000-50,000",
      "Take remaining profit as shareholder distributions",
      "File Form 1120-S annually",
    ],
    implemented: false,
    priority: "high" as const,
  },
  {
    id: "strat-3",
    name: "HSA Triple Tax Advantage",
    category: "Healthcare",
    summary:
      "Max out your HSA for triple tax benefits: deductible contributions, tax-free growth, and tax-free medical withdrawals.",
    whoItsFor: "Anyone with a High Deductible Health Plan (HDHP)",
    estimatedSavings: 2550,
    explanation:
      "The HSA is the only account with THREE tax advantages. Contribute $8,300 (family) pre-tax, invest the funds for tax-free growth, and withdraw tax-free for medical expenses. Pro tip: pay medical bills out of pocket now, let HSA grow, and reimburse yourself decades later for maximum compounding.",
    steps: [
      "Enroll in an HDHP during open enrollment",
      "Open HSA at Fidelity (best investment options, no fees)",
      "Max out contribution: $8,300 (family) for 2025",
      "Invest HSA in low-cost index funds",
      "Save medical receipts — reimburse yourself years later",
    ],
    implemented: false,
    priority: "medium" as const,
  },
  {
    id: "strat-4",
    name: "Backdoor Roth IRA",
    category: "Retirement",
    summary:
      "Your income is too high for direct Roth IRA contributions, but the Backdoor Roth lets you get around the limit legally.",
    whoItsFor:
      "High earners above Roth IRA income limits ($230K+ MFJ for 2025)",
    estimatedSavings: 1800,
    explanation:
      "Contribute $7,000 to a Traditional IRA (non-deductible), then convert to Roth IRA. The conversion is tax-free since you already paid tax on the contribution. Important: watch out for the pro-rata rule if you have existing Traditional IRA balances.",
    steps: [
      "Contribute $7,000 to a Traditional IRA (non-deductible)",
      "Wait 1-2 business days",
      "Convert the entire Traditional IRA balance to Roth IRA",
      "File Form 8606 to report the non-deductible contribution",
      "Roll any existing Traditional IRA into your 401(k) to avoid pro-rata rule",
    ],
    implemented: true,
    priority: "medium" as const,
  },
  {
    id: "strat-5",
    name: "Hire Your Kids",
    category: "Family",
    summary:
      "Shift income to your children's 0% tax bracket by employing them in your business. Legal for kids of any age.",
    whoItsFor:
      "Business owners with children (sole proprietors get the best benefit)",
    estimatedSavings: 3600,
    explanation:
      "Your children can earn up to $14,600 (2025 standard deduction) completely tax-free. As a sole proprietor, wages to children under 18 are also exempt from FICA taxes. You deduct the wages as a business expense, shifting income from your 24% bracket to their 0% bracket.",
    steps: [
      "Assign age-appropriate tasks (filing, cleaning office, social media, etc.)",
      "Pay a reasonable wage for the work performed",
      "Document hours worked and tasks completed",
      "Pay via check or direct deposit (not cash)",
      "Each child can earn up to $14,600 tax-free",
    ],
    implemented: false,
    priority: "medium" as const,
  },
  {
    id: "strat-6",
    name: "Augusta Rule (Section 280A)",
    category: "Real Estate",
    summary:
      "Rent your home to your business for up to 14 days per year — completely tax-free income.",
    whoItsFor: "Business owners who host meetings, events, or retreats",
    estimatedSavings: 5600,
    explanation:
      "Under Section 280A, you can rent your personal residence for up to 14 days/year without reporting the income. Your business deducts the rental expense, and you receive tax-free income. Use it for quarterly board meetings, team retreats, or client events at your home.",
    steps: [
      "Research comparable rental rates in your area",
      "Document each rental event with a business purpose",
      "Create a rental agreement between you and your business",
      "Charge fair market rental rate (e.g., $400/day × 14 days = $5,600)",
      "Business deducts rent; you don't report income",
    ],
    implemented: false,
    priority: "low" as const,
  },
  {
    id: "strat-7",
    name: "Mega Backdoor Roth",
    category: "Retirement",
    summary:
      "Contribute up to $69,000 total to Roth via after-tax 401(k) contributions and in-plan Roth conversion.",
    whoItsFor:
      "High earners with Solo 401(k) or employer plans allowing after-tax contributions",
    estimatedSavings: 4200,
    explanation:
      "After maxing your pre-tax 401(k) ($23,000), contribute additional after-tax dollars up to the total $69,000 limit, then immediately convert to Roth. This supercharges your Roth savings well beyond the $7,000 IRA limit.",
    steps: [
      "Verify your Solo 401(k) plan allows after-tax contributions",
      "Max out pre-tax employee contributions ($23,000)",
      "Make after-tax contributions up to the $69,000 total limit",
      "Immediately convert after-tax contributions to Roth",
      "Document all conversions for tax reporting",
    ],
    implemented: false,
    priority: "low" as const,
  },
  {
    id: "strat-8",
    name: "Annual Gifting Strategy",
    category: "Estate Planning",
    summary:
      "Gift up to $18,000 per person per year ($36K with spouse) without gift tax or reporting requirements.",
    whoItsFor: "Anyone wanting to transfer wealth to family members",
    estimatedSavings: 0,
    explanation:
      "While gifting doesn't provide an income tax deduction, it's a powerful estate planning tool. By gifting $18,000/year per person, you reduce your taxable estate. Combined with your spouse, you can gift $36,000 per person per year — that's $72,000/year to two children without any gift tax implications.",
    steps: [
      "Identify recipients and annual gift amounts",
      "Each spouse can gift $18,000/person/year independently",
      "Consider 529 plan superfunding (5 years of gifts at once)",
      "No gift tax return required if under annual exclusion",
      "Track cumulative gifts against lifetime exemption ($13.61M in 2025)",
    ],
    implemented: false,
    priority: "low" as const,
  },
];

export const mockTaxSummary = {
  taxYear: 2025,
  filingStatus: "Married Filing Jointly",
  income: {
    wages: 145000,
    selfEmployment: 62000,
    dividends: 3200,
    interest: 850,
    totalIncome: 211050,
  },
  adjustments: {
    selfEmploymentTax: 4383,
    solo401k: 0,
    hsaDeduction: 0,
    healthInsurance: 5400,
    totalAdjustments: 9783,
  },
  agi: 201267,
  deductions: {
    method: "Itemized" as const,
    mortgageInterest: 8400,
    propertyTax: 3200,
    saltCap: 10000,
    charitableContributions: 3600,
    homeOffice: 4200,
    businessVehicle: 3360,
    qbiDeduction: 12400,
    totalItemized: 42160,
    standardDeduction: 30000,
  },
  taxableIncome: 159107,
  taxCalculation: {
    regularTax: 27886,
    selfEmploymentTax: 8766,
    childTaxCredit: -4000,
    childCareCareCredit: -1200,
    totalTax: 31452,
  },
  payments: {
    federalWithheld: 28500,
    estimatedPayments: 8000,
    totalPayments: 36500,
  },
  refundOrOwed: 5048,
  effectiveTaxRate: 14.9,
  marginalTaxRate: 24,
  previousYear: {
    totalIncome: 168000,
    totalTax: 28200,
    refund: 2100,
    effectiveRate: 16.8,
  },
};

export const mockEducation = [
  {
    id: "edu-1",
    category: "Tax 101",
    title: "Understanding Tax Brackets",
    description:
      "Learn how marginal tax brackets work — you don't pay your top rate on all income.",
    readTime: "5 min",
    content: `Many people think if they're "in the 24% bracket," they pay 24% on ALL their income. Wrong! The US uses a marginal tax system. For Married Filing Jointly in 2025:

• 10% on income up to $23,200
• 12% on $23,201 – $94,300
• 22% on $94,301 – $201,050
• 24% on $201,051 – $383,900

So on $200,000 of taxable income, your effective rate is about 17.4%, not 22%. Understanding this eliminates the fear of "moving into a higher bracket" — only the dollars above each threshold are taxed at the higher rate.`,
  },
  {
    id: "edu-2",
    category: "Tax 101",
    title: "Standard vs. Itemized Deductions",
    description:
      "When to itemize and when the standard deduction saves you more.",
    readTime: "4 min",
    content: `The standard deduction for 2025 is $30,000 (MFJ) or $15,000 (Single). You should itemize when your total itemized deductions exceed these amounts.

Common itemized deductions:
• Mortgage interest
• State & local taxes (SALT, capped at $10,000)
• Charitable contributions
• Medical expenses (above 7.5% of AGI)

Pro tip: Consider "bunching" deductions — making two years of charitable gifts in one year to exceed the standard deduction, then taking the standard deduction the next year.`,
  },
  {
    id: "edu-3",
    category: "Strategy Deep Dive",
    title: "The Solo 401(k) Masterclass",
    description:
      "The most powerful retirement account for self-employed people.",
    readTime: "8 min",
    content: `If you have any self-employment income, the Solo 401(k) is a game-changer. Here's why:

1. MASSIVE contribution limits: Up to $69,000/year (2025)
2. Both employee ($23,000) and employer (25% of net SE income) contributions
3. Roth option available for tax-free growth
4. Loan provision (borrow up to 50% or $50K)
5. No mandatory contributions — contribute what you can

Example: $62K freelance income
• Employee contribution: $23,000
• Employer contribution: 25% × ($62K × 0.9235) = $14,314
• Total: $37,314 sheltered from taxes
• Tax savings at 24%: ~$8,955

Setup: Open at Fidelity (free), file Form 5500-EZ if assets exceed $250K. Must be established by Dec 31, contributions due by April 15.`,
  },
  {
    id: "edu-4",
    category: "Strategy Deep Dive",
    title: "S-Corp Election: Save on Self-Employment Tax",
    description:
      "How electing S-Corp status can save you thousands in SE tax.",
    readTime: "7 min",
    content: `The S-Corp election is one of the most impactful tax strategies for freelancers and consultants earning over $50K. Here's how it works:

As a sole proprietor, you pay 15.3% SE tax on ALL net income.
As an S-Corp, you pay yourself a "reasonable salary" and take the rest as distributions.

Example: $100K net freelance income

Sole Proprietor: 15.3% × $92,350 = $14,129 in SE tax
S-Corp (salary $60K): 15.3% × $60,000 = $9,180 in SE tax
Savings: $4,949/year

The IRS requires a "reasonable salary" — typically 60-70% of what you'd earn as an employee in a similar role. Don't get too aggressive; the savings are already significant.

Costs to consider: payroll service (~$50/month), separate tax return (~$500-1,500), and quarterly payroll taxes.`,
  },
  {
    id: "edu-5",
    category: "Wealth Building",
    title: "The Tax-Free Wealth Playbook",
    description:
      "Strategies the wealthy use to legally minimize taxes and build generational wealth.",
    readTime: "10 min",
    content: `Building wealth is not just about earning more — it's about keeping more. Here's the playbook:

1. MAX TAX-ADVANTAGED ACCOUNTS
• 401(k)/Solo 401(k): $69,000/year
• HSA: $8,300/year (family)
• Backdoor Roth IRA: $7,000/year

2. OPTIMIZE YOUR ENTITY STRUCTURE
• S-Corp for active income over $50K
• LLC for liability protection
• Trust for estate planning

3. REAL ESTATE TAX BENEFITS
• Depreciation offsets rental income
• 1031 exchanges to defer capital gains
• Cost segregation to accelerate depreciation
• Augusta Rule for tax-free rental income

4. INVEST TAX-EFFICIENTLY
• Hold investments over 1 year for long-term capital gains rates (0%, 15%, 20%)
• Tax-loss harvesting to offset gains
• Donate appreciated stock to charity

5. THINK GENERATIONALLY
• $18K annual gift exclusion per person
• 529 plans for education
• Roth accounts for tax-free inheritance`,
  },
  {
    id: "edu-6",
    category: "Tax 101",
    title: "Credits vs. Deductions: What's the Difference?",
    description:
      "Why a $1,000 credit is worth more than a $1,000 deduction.",
    readTime: "3 min",
    content: `Deductions reduce your TAXABLE INCOME. Credits reduce your TAX directly.

Example at 24% tax bracket:
• $1,000 deduction saves you $240 (24% × $1,000)
• $1,000 credit saves you $1,000 (dollar-for-dollar)

Credits are always more valuable! Common credits:
• Child Tax Credit: $2,000/child
• Child & Dependent Care Credit: up to $2,100
• Earned Income Tax Credit: up to $7,430
• Lifetime Learning Credit: up to $2,000
• Energy Efficient Home Credit: up to $3,200

Some credits are "refundable" (you get money back even if you owe no tax) and some are "non-refundable" (only reduce tax to $0).`,
  },
];

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

export const mockChatHistory: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content:
      "Should I set up a Solo 401(k) for my freelance consulting income?",
    timestamp: "2:34 PM",
  },
  {
    id: "msg-2",
    role: "assistant",
    content: `Absolutely — a Solo 401(k) would be one of the best moves you can make with your $62,000 in consulting income. Here's why:

**Contribution Limits for 2025:**
• Employee contribution: $23,000
• Employer contribution: 25% of net SE income (~$14,314)
• Total potential: ~$37,314

**Tax Savings:**
At your 24% marginal rate, maxing out could save you approximately **$8,955 in federal taxes** this year alone.

**Key Benefits:**
1. Reduces your taxable income immediately
2. Tax-deferred growth
3. Roth option available for tax-free growth
4. Can take loans from the account
5. No income limits (unlike Roth IRA)

**Action Steps:**
1. Open a Solo 401(k) at Fidelity or Schwab (free, no fees)
2. Plan must be established by December 31, 2025
3. Contributions can be made until April 15, 2026

Would you like me to calculate the exact contribution amounts based on your net self-employment income?

*Disclaimer: This is educational information, not professional tax advice. Consult a qualified tax professional for personalized guidance.*`,
    timestamp: "2:34 PM",
  },
];

export const mockChatResponses: Record<string, string> = {
  default: `That's a great question! Based on your tax profile, here are some key points to consider:

1. **Your current situation**: With $211K in combined income (W-2 + freelance), you're in the 24% marginal bracket filing jointly.

2. **Biggest opportunities**: Your freelance income opens up powerful strategies like Solo 401(k), S-Corp election, and QBI deduction that W-2 employees can't access.

3. **Recommended next steps**: I'd suggest focusing on maximizing your retirement contributions first — that has the highest immediate tax impact.

Would you like me to dive deeper into any of these areas?

*Disclaimer: This is educational information, not professional tax advice. Consult a qualified tax professional for personalized guidance.*`,

  "s-corp": `Great question about S-Corp election! Based on your $62,000 in freelance income, here's the analysis:

**Current (Sole Proprietor):**
• SE tax: 15.3% × $57,247 (92.35% of $62K) = **$8,758**

**With S-Corp (Reasonable salary: $45,000):**
• FICA on salary: 15.3% × $45,000 = **$6,885**
• SE tax on distributions: **$0**

**Annual savings: ~$1,873**

However, consider the costs:
• Payroll service: ~$600/year
• Additional tax return (Form 1120-S): ~$1,000-1,500
• State franchise fees vary

**Verdict**: With $62K in freelance income, you're right at the break-even point. If your freelance income grows above $80K, S-Corp becomes a no-brainer. For now, it may be marginal after accounting for costs.

*Disclaimer: This is educational information, not professional tax advice.*`,

  retirement: `Here's your optimal retirement savings strategy for 2025:

**1. Solo 401(k) — Priority #1**
• Employee: $23,000
• Employer: ~$14,314 (25% of net SE income)
• Tax savings: ~$8,955

**2. Backdoor Roth IRA**
• You + Spouse: $7,000 × 2 = $14,000
• Tax-free growth forever

**3. HSA (if eligible)**
• Family: $8,300
• Triple tax advantage
• Tax savings: ~$1,992

**Total sheltered: ~$59,614**
**Total tax savings: ~$12,747**

This is the "stack" that high-earners use to minimize taxes while building wealth. Start with the Solo 401(k) since it has the highest impact.

*Disclaimer: This is educational information, not professional tax advice.*`,

  deductions: `Based on your profile, here are the deductions you might be missing:

**Currently Unclaimed:**

1. **HSA Contribution** — $2,550 potential savings
   If you have an HDHP, max it out at $8,300 (family)

2. **Child & Dependent Care Credit** — $1,200 potential
   If you're paying for daycare/preschool, claim this

3. **Charitable Contributions** — $1,800 potential
   Are you tracking all donations including non-cash items?

4. **Lifetime Learning Credit** — $2,000 potential
   Taking any courses or professional development?

**Total unclaimed: ~$7,550 in potential savings**

Want me to walk through any of these in detail?

*Disclaimer: This is educational information, not professional tax advice.*`,
};
