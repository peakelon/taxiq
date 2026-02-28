"use client";

import { useMemo } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currency } from "@/lib/utils";

export default function SummaryPage() {
  const { profile, deductions, selectedDeductionIds, strategies, yearSnapshots } = useAppState();

  const totalIncome =
    profile.w2Income +
    profile.income1099 +
    profile.businessIncome +
    profile.rentalIncome +
    profile.investmentIncome;

  const selectedDeductions = deductions.filter((item) => selectedDeductionIds.includes(item.id));
  const deductionTotal = selectedDeductions.reduce((sum, item) => sum + item.estimatedSavings, 0);
  const projectedTax = Math.max(0, totalIncome * 0.24 - deductionTotal);
  const refundOrBalance =
    profile.w2Income * 0.13 + profile.income1099 * 0.08 - projectedTax;

  const topStrategies = strategies
    .filter((item) => item.status !== "later")
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);

  const exportPayload = useMemo(
    () => ({
      generatedAt: new Date().toISOString(),
      profile,
      totals: {
        totalIncome,
        selectedDeductions: deductionTotal,
        projectedTax,
        projectedRefundOrBalance: refundOrBalance
      },
      selectedDeductionTitles: selectedDeductions.map((item) => item.title),
      strategyPlan: topStrategies.map((item) => ({
        name: item.name,
        status: item.status,
        estimatedSavings: item.estimatedSavings,
        nextStep: item.steps[0]
      }))
    }),
    [profile, totalIncome, deductionTotal, projectedTax, refundOrBalance, selectedDeductions, topStrategies]
  );

  const exportSummary = () => {
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "taxiq-summary.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const maxIncome = Math.max(...yearSnapshots.map((item) => item.income));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Tax Summary & Filing Prep</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Export-ready prep summary for your CPA. Filing is not included in v1.
          </p>
        </div>
        <Button onClick={exportSummary}>Export CPA JSON</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Income" value={currency(totalIncome)} />
        <SummaryCard label="Planned Deductions" value={currency(deductionTotal)} />
        <SummaryCard label="Projected Tax" value={currency(projectedTax)} />
        <SummaryCard
          label={refundOrBalance >= 0 ? "Projected Refund" : "Projected Balance"}
          value={currency(Math.abs(refundOrBalance))}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Year-over-year trend</CardTitle>
            <CardDescription>Income and deductions comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {yearSnapshots.map((year) => (
              <div key={year.year} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{year.year}</span>
                  <span>{currency(year.income)}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-brandBlue dark:bg-brandGreen"
                    style={{ width: `${(year.income / maxIncome) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Deductions {currency(year.deductions)} • Tax {currency(year.tax)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Priority strategy plan</CardTitle>
            <CardDescription>Recommended actions for next 90 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topStrategies.map((strategy) => (
              <div key={strategy.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="font-medium">{strategy.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Potential savings {currency(strategy.estimatedSavings)}
                </p>
                <p className="text-sm">Next: {strategy.steps[0]}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-semibold text-brandBlue dark:text-brandGreen">{value}</p>
      </CardContent>
    </Card>
  );
}
