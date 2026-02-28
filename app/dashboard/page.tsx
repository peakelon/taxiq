"use client";

import Link from "next/link";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currency } from "@/lib/utils";

export default function DashboardPage() {
  const { profile, documents, deductions, selectedDeductionIds, strategies } = useAppState();

  const totalIncome =
    profile.w2Income +
    profile.income1099 +
    profile.businessIncome +
    profile.rentalIncome +
    profile.investmentIncome;

  const selectedDeductions = deductions.filter((item) => selectedDeductionIds.includes(item.id));
  const deductionSavings = selectedDeductions.reduce((sum, item) => sum + item.estimatedSavings, 0);
  const strategySavings = strategies.reduce((sum, item) => sum + item.estimatedSavings, 0);
  const projectedTax = Math.max(0, totalIncome * 0.24 - deductionSavings);

  const completion =
    Math.round(
      ((documents.length >= 2 ? 1 : 0) + (selectedDeductionIds.length > 0 ? 1 : 0) + (strategies.length > 0 ? 1 : 0)) /
        3 *
        100
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">TaxIQ Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Your planning snapshot for tax year 2024. Educational use only.
          </p>
        </div>
        <Badge variant="secondary">Demo Mode</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Estimated Income" value={currency(totalIncome)} />
        <MetricCard label="Active Deductions" value={currency(deductionSavings)} />
        <MetricCard label="Projected Tax" value={currency(projectedTax)} />
        <MetricCard label="Strategy Upside" value={currency(strategySavings)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Workflow progress</CardTitle>
            <CardDescription>Finish each step for an export-ready CPA summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={completion} />
            <p className="text-sm text-slate-500 dark:text-slate-400">{completion}% completed</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <QuickLink href="/upload" title="Upload documents" detail={`${documents.length} files parsed`} />
              <QuickLink
                href="/deductions"
                title="Apply deductions"
                detail={`${selectedDeductionIds.length} deductions selected`}
              />
              <QuickLink href="/strategies" title="Review strategies" detail={`${strategies.length} recommendations`} />
              <QuickLink href="/summary" title="Generate summary" detail="Export for CPA" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top opportunities</CardTitle>
            <CardDescription>Highest impact opportunities from your profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {strategies.slice(0, 3).map((item) => (
              <div key={item.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Potential {currency(item.estimatedSavings)} savings
                </p>
              </div>
            ))}
            <Link href="/strategies">
              <Button className="w-full">Open Strategy Engine</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-brandBlue dark:text-brandGreen">{value}</p>
      </CardContent>
    </Card>
  );
}

function QuickLink({ href, title, detail }: { href: string; title: string; detail: string }) {
  return (
    <Link href={href} className="rounded-lg border border-slate-200 p-3 transition hover:border-brandGreen dark:border-slate-700">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{detail}</p>
    </Link>
  );
}
