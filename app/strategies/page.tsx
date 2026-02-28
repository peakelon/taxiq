"use client";

import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { currency, percent } from "@/lib/utils";
import type { StrategyStatus } from "@/lib/types";

const statusLabels: Record<StrategyStatus, string> = {
  recommended: "Recommended now",
  considering: "Considering",
  later: "Plan later"
};

export default function StrategiesPage() {
  const { strategies, setStrategyStatus } = useAppState();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Tax Strategy Engine</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Personalized recommendations inspired by wealth-first tax planning frameworks.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {strategies.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{item.name}</CardTitle>
                <Badge variant={item.status === "recommended" ? "success" : "secondary"}>
                  {statusLabels[item.status]}
                </Badge>
              </div>
              <CardDescription>{item.explanation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400">Who it is for</p>
                <p className="text-sm">{item.whoItsFor}</p>
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Fit score</span>
                  <span>{percent(item.fitScore)}</span>
                </div>
                <Progress value={item.fitScore} />
              </div>
              <p className="font-medium text-brandBlue dark:text-brandGreen">
                Estimated savings: {currency(item.estimatedSavings)}
              </p>
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                <p className="text-xs font-medium uppercase text-slate-500 dark:text-slate-400">Implementation steps</p>
                <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  {item.steps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase text-slate-500 dark:text-slate-400">Decision status</p>
                <Select
                  value={item.status}
                  onChange={(event) =>
                    setStrategyStatus(item.id, event.target.value as StrategyStatus)
                  }
                >
                  <option value="recommended">Recommended now</option>
                  <option value="considering">Considering</option>
                  <option value="later">Plan later</option>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
