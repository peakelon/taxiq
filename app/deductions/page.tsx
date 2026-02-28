"use client";

import { useMemo, useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currency } from "@/lib/utils";

const categories = [
  "All",
  "Self-employed",
  "Business Owner",
  "Homeowner",
  "Family",
  "Medical",
  "Charitable",
  "Education"
];

export default function DeductionsPage() {
  const { deductions, selectedDeductionIds, toggleDeduction } = useAppState();
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      deductions.filter((item) => {
        if (category === "All") return true;
        return item.category === category;
      }),
    [category, deductions]
  );

  const selectedTotal = deductions
    .filter((item) => selectedDeductionIds.includes(item.id))
    .reduce((sum, item) => sum + item.estimatedSavings, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Deduction Finder</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Walkthrough of likely deductions based on your profile and income mix.
          </p>
        </div>
        <Card className="min-w-56">
          <CardContent className="p-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">Estimated annual savings</p>
            <p className="text-2xl font-semibold text-brandGreen">{currency(selectedTotal)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              category === item
                ? "border-brandGreen bg-brandGreen/10 text-brandBlue dark:text-brandGreen"
                : "border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => {
          const selected = selectedDeductionIds.includes(item.id);
          return (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant={item.eligible ? "success" : "secondary"}>
                    {item.eligible ? "Likely eligible" : "Needs review"}
                  </Badge>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-300">{item.qualifies}</p>
                <p className="text-sm font-medium text-brandBlue dark:text-brandGreen">
                  Potential savings: {currency(item.estimatedSavings)}
                </p>
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <p className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400">Action items</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    {item.actionItems.map((action) => (
                      <li key={action}>• {action}</li>
                    ))}
                  </ul>
                </div>
                <Button variant={selected ? "secondary" : "outline"} onClick={() => toggleDeduction(item.id)}>
                  {selected ? "Added to plan" : "Add deduction"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
