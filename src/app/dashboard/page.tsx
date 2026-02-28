"use client";

import Link from "next/link";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Search,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Upload,
  UserCircle,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockTaxSummary, mockProfile, mockDocuments } from "@/lib/mock-data";

const quickActions = [
  {
    href: "/upload",
    label: "Upload Documents",
    icon: Upload,
    description: "Add W-2s, 1099s",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/50",
  },
  {
    href: "/profile",
    label: "Tax Profile",
    icon: UserCircle,
    description: "Update your info",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/50",
  },
  {
    href: "/deductions",
    label: "Find Deductions",
    icon: Search,
    description: "Discover savings",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-50 dark:bg-green-950/50",
  },
  {
    href: "/strategies",
    label: "View Strategies",
    icon: Lightbulb,
    description: "Tax optimization",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/50",
  },
  {
    href: "/chat",
    label: "AI Advisor",
    icon: MessageSquare,
    description: "Ask questions",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/50",
  },
  {
    href: "/summary",
    label: "Tax Summary",
    icon: FileText,
    description: "View & export",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/50",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DashboardPage() {
  const s = mockTaxSummary;
  const incomeDiff =
    ((s.income.totalIncome - s.previousYear.totalIncome) /
      s.previousYear.totalIncome) *
    100;
  const taxDiff =
    ((s.taxCalculation.totalTax - s.previousYear.totalTax) /
      s.previousYear.totalTax) *
    100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {mockProfile.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s your {s.taxYear} tax overview. You&apos;re on track for a{" "}
          <span className="font-semibold text-[#38a169] dark:text-[#48bb78]">
            {formatCurrency(s.refundOrOwed)} refund
          </span>
          .
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(s.income.totalIncome)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              {incomeDiff > 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <span
                className={
                  incomeDiff > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600"
                }
              >
                {Math.abs(incomeDiff).toFixed(1)}%
              </span>
              <span className="text-muted-foreground">vs last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Deductions
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(s.deductions.totalItemized)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-50 dark:bg-green-950/50 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <Badge
              variant="secondary"
              className="mt-2 text-xs bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
            >
              Itemized — saves{" "}
              {formatCurrency(s.deductions.totalItemized - s.deductions.standardDeduction)}{" "}
              more
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Tax</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(s.taxCalculation.totalTax)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
                <Percent className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <span className="text-muted-foreground">
                Effective rate: {s.effectiveTaxRate}% | Marginal: {s.marginalTaxRate}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#38a169]/30 dark:border-[#48bb78]/30 bg-[#38a169]/5 dark:bg-[#48bb78]/5">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Estimated Refund
                </p>
                <p className="text-2xl font-bold text-[#38a169] dark:text-[#48bb78]">
                  {formatCurrency(s.refundOrOwed)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-[#38a169]/10 dark:bg-[#48bb78]/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-[#38a169] dark:text-[#48bb78]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <ArrowUpRight className="h-3 w-3 text-[#38a169] dark:text-[#48bb78]" />
              <span className="text-[#38a169] dark:text-[#48bb78]">
                {formatCurrency(s.refundOrOwed - s.previousYear.refund)} more
              </span>
              <span className="text-muted-foreground">vs last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile & Documents Progress */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tax Prep Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Profile Completion</span>
                <span className="text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Documents Uploaded</span>
                <span className="text-muted-foreground">
                  {mockDocuments.length}/5
                </span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Deductions Reviewed</span>
                <span className="text-muted-foreground">8/12</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Strategies Evaluated</span>
                <span className="text-muted-foreground">3/8</span>
              </div>
              <Progress value={38} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Income Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockProfile.incomes.map((inc, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: ["#1a365d", "#38a169", "#4299e1", "#ed8936"][i],
                    }}
                  />
                  <div>
                    <div className="text-sm font-medium">{inc.source}</div>
                    <div className="text-xs text-muted-foreground">
                      {inc.type}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold">
                  {formatCurrency(inc.amount)}
                </div>
              </div>
            ))}
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(mockProfile.totalIncome)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                  <CardContent className="pt-4 pb-4 flex flex-col items-center text-center">
                    <div
                      className={`h-10 w-10 rounded-lg ${action.bg} flex items-center justify-center mb-2`}
                    >
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div className="text-sm font-medium">{action.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Potential Savings Alert */}
      <Card className="border-[#38a169]/30 dark:border-[#48bb78]/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-[#38a169]/10 dark:bg-[#48bb78]/10 flex items-center justify-center shrink-0">
                <Lightbulb className="h-6 w-6 text-[#38a169] dark:text-[#48bb78]" />
              </div>
              <div>
                <h3 className="font-semibold">
                  Potential Additional Savings: {formatCurrency(7550)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  We found 4 unclaimed deductions and 3 strategies that could
                  save you more. Review them in the Deductions and Strategies
                  pages.
                </p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href="/deductions">
                <Button variant="outline" size="sm">
                  Deductions
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
              <Link href="/strategies">
                <Button
                  size="sm"
                  className="bg-[#38a169] hover:bg-[#2f855a] text-white"
                >
                  Strategies
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
