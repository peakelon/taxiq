import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Search,
  Lightbulb,
  MessageSquare,
  Shield,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const features = [
  {
    icon: Upload,
    title: "Smart Document Parsing",
    description:
      "Upload your W-2s, 1099s, and tax documents. Our AI extracts every field automatically.",
  },
  {
    icon: Search,
    title: "Deduction Finder",
    description:
      "Walk through every potential deduction based on your unique profile. Never miss a write-off.",
  },
  {
    icon: Lightbulb,
    title: "Strategy Engine",
    description:
      "Personalized tax strategies — Solo 401(k), S-Corp election, Augusta Rule, and more.",
  },
  {
    icon: MessageSquare,
    title: "AI Tax Advisor",
    description:
      "Chat with an AI that knows your profile, cites tax code, and suggests strategies in plain English.",
  },
];

const strategies = [
  "Solo 401(k) — Save up to $69,000/year tax-deferred",
  "S-Corp Election — Cut self-employment tax by thousands",
  "Backdoor Roth IRA — Tax-free growth for high earners",
  "HSA Triple Tax Advantage — The ultimate health savings hack",
  "QBI Deduction — 20% off qualified business income",
  "Augusta Rule — 14 days of tax-free rental income",
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Freelance Designer",
    quote:
      "TaxIQ found $12,400 in deductions I was missing. The Solo 401(k) recommendation alone saved me $9,000.",
    savings: "$12,400",
  },
  {
    name: "Marcus T.",
    role: "Real Estate Investor",
    quote:
      "The strategy engine is incredible. It's like having a CPA and financial advisor rolled into one.",
    savings: "$23,800",
  },
  {
    name: "Priya K.",
    role: "Tech Consultant",
    quote:
      "I went from dreading tax season to actually being excited about optimizing my taxes. Game changer.",
    savings: "$8,200",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a365d] dark:bg-[#60a5fa]">
              <TrendingUp className="h-5 w-5 text-white dark:text-[#0f172a]" />
            </div>
            <span className="text-[#1a365d] dark:text-[#60a5fa]">TaxIQ</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a365d] to-[#2d4a7a] dark:from-[#0f172a] dark:to-[#1e293b]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm text-white/90">
              <Star className="h-4 w-4 text-[#38a169]" />
              AI-Powered Tax Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stop Overpaying
              <br />
              <span className="text-[#48bb78]">Start Building Wealth</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              TaxIQ doesn&apos;t just do your taxes — it teaches you how to
              legally minimize your tax burden and build generational wealth
              using strategies from top financial educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#38a169] hover:bg-[#2f855a] text-white text-lg px-8 w-full sm:w-auto"
                >
                  Start Saving Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-lg px-8 w-full sm:w-auto"
                >
                  Learn Strategies
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-12 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Bank-Level Security
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                IRS Compliant
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Free to Start
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-muted/50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1a365d] dark:text-[#60a5fa]">
                $12,400
              </div>
              <div className="text-sm text-muted-foreground">
                Avg. Deductions Found
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#38a169] dark:text-[#48bb78]">
                47+
              </div>
              <div className="text-sm text-muted-foreground">
                Tax Strategies
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1a365d] dark:text-[#60a5fa]">
                15 min
              </div>
              <div className="text-sm text-muted-foreground">
                Average Setup Time
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#38a169] dark:text-[#48bb78]">
                98%
              </div>
              <div className="text-sm text-muted-foreground">
                User Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-[#38a169] dark:text-[#48bb78]">
              Optimize Your Taxes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From document parsing to personalized strategy recommendations,
            TaxIQ handles it all.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-[#1a365d]/10 dark:bg-[#60a5fa]/10 flex items-center justify-center mb-4 group-hover:bg-[#38a169]/10 transition-colors">
                    <Icon className="h-6 w-6 text-[#1a365d] dark:text-[#60a5fa] group-hover:text-[#38a169] dark:group-hover:text-[#48bb78] transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Strategies Preview */}
      <section className="bg-muted/30">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Strategies the Wealthy Use —{" "}
                <span className="text-[#38a169] dark:text-[#48bb78]">
                  Now Available to You
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Inspired by top financial educators like Preston Seo (The Legacy
                Investing Show), our strategy engine recommends proven,
                IRS-compliant techniques tailored to your situation.
              </p>
              <Link href="/strategies">
                <Button size="lg">
                  View All Strategies
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {strategies.map((strategy) => (
                <div
                  key={strategy}
                  className="flex items-start gap-3 bg-background rounded-lg p-4 shadow-sm border"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] dark:text-[#48bb78] mt-0.5 shrink-0" />
                  <span className="text-sm font-medium">{strategy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real People,{" "}
            <span className="text-[#38a169] dark:text-[#48bb78]">
              Real Savings
            </span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-[#38a169] text-[#38a169] dark:fill-[#48bb78] dark:text-[#48bb78]"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#38a169] dark:text-[#48bb78]">
                      {t.savings}
                    </div>
                    <div className="text-xs text-muted-foreground">saved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1a365d] to-[#2d4a7a] dark:from-[#1e293b] dark:to-[#334155]">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Keep More of What You Earn?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands who have discovered deductions they were missing and
            strategies to build lasting wealth.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-[#38a169] hover:bg-[#2f855a] text-white text-lg px-10"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[#1a365d] dark:bg-[#60a5fa]">
                <TrendingUp className="h-4 w-4 text-white dark:text-[#0f172a]" />
              </div>
              <span className="text-sm font-semibold text-[#1a365d] dark:text-[#60a5fa]">
                TaxIQ
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-lg">
              TaxIQ provides educational tax information and strategy
              recommendations. This is not professional tax advice. Consult a
              qualified tax professional for personalized guidance.
            </p>
            <div className="text-xs text-muted-foreground">
              &copy; 2026 TaxIQ. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
