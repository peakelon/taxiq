"use client";

import { useState } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Filter,
  Briefcase,
  Home,
  Heart,
  Stethoscope,
  GraduationCap,
  Gift,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockDeductions } from "@/lib/mock-data";

const categories = [
  { name: "All", icon: Filter },
  { name: "Self-Employed", icon: User },
  { name: "Business Owner", icon: Briefcase },
  { name: "Homeowner", icon: Home },
  { name: "Family", icon: Heart },
  { name: "Medical", icon: Stethoscope },
  { name: "Charitable", icon: Gift },
  { name: "Education", icon: GraduationCap },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default function DeductionsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deductions, setDeductions] = useState(mockDeductions);

  const filtered = deductions.filter((d) => {
    const matchesCategory =
      activeCategory === "All" || d.category === activeCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalClaimed = filtered
    .filter((d) => d.claimed)
    .reduce((sum, d) => sum + d.estimatedSavings, 0);
  const totalUnclaimed = filtered
    .filter((d) => !d.claimed)
    .reduce((sum, d) => sum + d.estimatedSavings, 0);

  const toggleClaimed = (id: string) => {
    setDeductions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, claimed: !d.claimed } : d))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deduction Finder</h1>
        <p className="text-muted-foreground mt-1">
          Walk through every potential deduction based on your profile. Mark
          the ones you&apos;re claiming.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Potential</div>
            <div className="text-2xl font-bold">
              {formatCurrency(totalClaimed + totalUnclaimed)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {filtered.length} deductions found
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#38a169]/30 dark:border-[#48bb78]/30">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Claimed</div>
            <div className="text-2xl font-bold text-[#38a169] dark:text-[#48bb78]">
              {formatCurrency(totalClaimed)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {filtered.filter((d) => d.claimed).length} deductions claimed
            </div>
          </CardContent>
        </Card>
        <Card className="border-amber-300/50 dark:border-amber-500/30">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">
              Unclaimed Savings
            </div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {formatCurrency(totalUnclaimed)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {filtered.filter((d) => !d.claimed).length} deductions to review
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deductions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.name}
                variant={activeCategory === cat.name ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.name)}
                className="gap-1.5"
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{cat.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Deduction Cards */}
      <div className="space-y-4">
        {filtered.map((deduction) => {
          const isExpanded = expandedId === deduction.id;
          return (
            <Card
              key={deduction.id}
              className={`transition-all ${
                deduction.claimed
                  ? "border-[#38a169]/30 dark:border-[#48bb78]/30"
                  : "border-amber-300/30 dark:border-amber-500/20"
              }`}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleClaimed(deduction.id)}
                    className="mt-0.5 shrink-0"
                  >
                    {deduction.claimed ? (
                      <CheckCircle2 className="h-6 w-6 text-[#38a169] dark:text-[#48bb78]" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground hover:text-[#38a169] dark:hover:text-[#48bb78] transition-colors" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold">{deduction.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {deduction.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {deduction.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-[#38a169] dark:text-[#48bb78]" />
                          <span className="text-lg font-bold text-[#38a169] dark:text-[#48bb78]">
                            {formatCurrency(deduction.estimatedSavings)}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          est. savings
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : deduction.id)
                      }
                      className="flex items-center gap-1 mt-3 text-sm text-[#1a365d] dark:text-[#60a5fa] hover:underline"
                    >
                      {isExpanded ? (
                        <>
                          Hide details <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Show details <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Who Qualifies
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {deduction.whoQualifies}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Action Items
                          </h4>
                          <ul className="space-y-2">
                            {deduction.actionItems.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="h-5 w-5 rounded-full bg-[#1a365d]/10 dark:bg-[#60a5fa]/10 flex items-center justify-center text-xs font-medium shrink-0">
                                  {i + 1}
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground">
            No deductions found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
}
