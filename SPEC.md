# TaxIQ — AI Tax Strategist & Wealth Builder

## Vision
TaxIQ is an AI-powered tax preparation and wealth strategy platform. It doesn't just do your taxes — it teaches you how to legally minimize your tax burden and build wealth using strategies from top financial educators like Preston Seo (The Legacy Investing Show).

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Clerk
- **Database:** Vercel Postgres (Drizzle ORM)
- **AI:** OpenAI API (GPT-4o) for document parsing, chat, and strategy recommendations
- **PDF Parsing:** pdf-parse for W-2/1099 extraction
- **File Upload:** Vercel Blob
- **Deployment:** Vercel
- **Repo:** GitHub (simsketch/taxiq)

## Core Features

### 1. Document Upload & Parsing
- Upload W-2s, 1099s, and other tax documents (PDF)
- AI extracts key fields: wages, withholdings, employer info, etc.
- Review and confirm extracted data
- Store parsed data in user profile

### 2. Smart Profile Builder
- Guided questionnaire flow (wizard-style)
- Filing status, dependents, state of residence
- Income sources: W-2, 1099, business income, rental income, investments
- Life events: marriage, new baby, home purchase, job change
- Business details: entity type, home office, vehicle use

### 3. Deduction Finder
- Walks through every potential deduction based on profile
- Categories: Self-employed, Business owner, Homeowner, Family, Medical, Charitable, Education
- Each deduction shows: what it is, who qualifies, estimated savings, action items

### 4. Tax Strategy Engine
Personalized recommendations inspired by Legacy Investing Show:
- Solo 401(k), SEP IRA, Backdoor Roth IRA
- HSA Triple Tax Advantage
- S-Corp Election for SE tax savings
- Hire Your Kids (shift income to 0% bracket)
- Augusta Rule (rent home to business, 14 days tax-free)
- 1031 Exchange, Cost Segregation
- QBI 20% deduction
- Annual Gifting Strategy, Entity Structuring
- Each card: plain English explanation, who it's for, estimated savings, steps to implement

### 5. Education Hub
- Tax 101, strategy deep dives, wealth building playbook
- Glossary, embedded video content

### 6. Tax Summary & Filing Prep
- Dashboard: estimated income, deductions, credits, tax owed/refund
- Year-over-year comparison, export-ready summary for CPA
- NOT actual e-filing (v1) — prep and strategy focus

### 7. AI Tax Chat
- Context-aware chat knowing your profile and documents
- Cites tax code sections, suggests strategies
- Disclaimer: educational, not professional tax advice

## Pages
- `/` — Landing page
- `/dashboard` — Main dashboard
- `/upload` — Document upload & parsing
- `/profile` — Tax profile questionnaire
- `/deductions` — Deduction finder
- `/strategies` — Tax strategy recommendations
- `/learn` — Education hub
- `/chat` — AI tax advisor chat
- `/summary` — Tax summary & export

## Design
- Clean, modern, professional but approachable
- Dark mode support
- Deep blue (#1a365d) + green accents (#38a169)
- Card-based layouts, progress indicators, mobile-responsive

## MVP Scope (v1)
1. Landing page + Auth (Clerk)
2. Document upload + AI parsing
3. Profile questionnaire wizard
4. Deduction finder with savings estimates
5. Strategy recommendations
6. Tax summary dashboard
7. AI chat
8. Basic education content
