"use client";

import { useState } from "react";
import {
  Lightbulb,
  DollarSign,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Filter,
  Zap,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockStrategies } from "@/lib/mock-data";

const categoryFilters = [
  "All",
  "Retirement",
  "Entity Structure",
  "Healthcare",
  "Family",
  "Real Estate",
  "Estate Planning",
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

function PriorityBadge({ priority }: { priority: string }) {
  switch (priority) {
    case "high":
      return (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 gap-1">
          <Zap className="h-3 w-3" />
          High Priority
        </Badge>
      );
    case "medium":
      return (
        <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 gap-1">
          <TrendingUp className="h-3 w-3" />
          Medium
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="gap-1">
          <Shield className="h-3 w-3" />
          Consider
        </Badge>
      );
  }
}

export default function StrategiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [strategies, setStrategies] = useState(mockStrategies);

  const filtered = strategies.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  const totalPotential = strategies.reduce(
    (sum, s) => sum + s.estimatedSavings,
    0
  );
  const totalImplemented = strategies
    .filter((s) => s.implemented)
    .reduce((sum, s) => sum + s.estimatedSavings, 0);

  const toggleImplemented = (id: string) => {
    setStrategies((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, implemented: !s.implemented } : s
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tax Strategy Engine</h1>
        <p className="text-muted-foreground mt-1">
          Personalized strategies inspired by top financial educators. Each
          strategy includes plain-English explanations and steps to implement.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              Total Potential Savings
            </div>
            <div className="text-2xl font-bold">
              {formatCurrency(totalPotential)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {strategies.length} strategies available
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#38a169]/30 dark:border-[#48bb78]/30">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Implemented</div>
            <div className="text-2xl font-bold text-[#38a169] dark:text-[#48bb78]">
              {formatCurrency(totalImplemented)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {strategies.filter((s) => s.implemented).length} strategies active
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-300/50 dark:border-amber-500/30">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              Unrealized Savings
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {formatCurrency(totalPotential - totalImplemented)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {strategies.filter((s) => !s.implemented).length} strategies to
              consider
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categoryFilters.map((cat) => (
          <Button
            key={cat}
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Strategy Cards */}
      <div className="space-y-4">
        {filtered.map((strategy) => {
          const isExpanded = expandedId === strategy.id;
          return (
            <Card
              key={strategy.id}
              className={`transition-all ${
                strategy.implemented
                  ? "border-[#38a169]/30 dark:border-[#48bb78]/30"
                  : ""
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleImplemented(strategy.id)}
                    className="mt-0.5 shrink-0"
                  >
                    {strategy.implemented ? (
                      <CheckCircle2 className="h-6 w-6 text-[#38a169] dark:text-[#48bb78]" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-[#38a169] dark:hover:text-[#48bb78] transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-lg">
                            {strategy.name}
                          </h3>
                          <PriorityBadge priority={strategy.priority} />
                          <Badge variant="secondary" className="text-xs">
                            {strategy.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {strategy.summary}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        {strategy.estimatedSavings > 0 && (
                          <>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4 text-[#38a169] dark:text-[#48bb78]" />
                              <span className="text-xl font-bold text-[#38a169] dark:text-[#48bb78]">
                                {formatCurrency(strategy.estimatedSavings)}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              est. annual savings
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Who it&apos;s for:
                      </span>{" "}
                      {strategy.whoItsFor}
                    </div>

                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : strategy.id)
                      }
                      className="flex items-center gap-1 mt-3 text-sm text-[#1a365d] dark:text-[#60a5fa] hover:underline"
                    >
                      {isExpanded ? (
                        <>
                          Hide details <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Learn more & implement{" "}
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            How It Works
                          </h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">
                            {strategy.explanation}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Steps to Implement
                          </h4>
                          <ol className="space-y-2">
                            {strategy.steps.map((step, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="h-6 w-6 rounded-full bg-[#1a365d] dark:bg-[#60a5fa] text-white dark:text-[#0f172a] flex items-center justify-center text-xs font-bold shrink-0">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        {!strategy.implemented && (
                          <Button
                            className="bg-[#38a169] hover:bg-[#2f855a] text-white"
                            onClick={() => toggleImplemented(strategy.id)}
                          >
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Implemented
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
