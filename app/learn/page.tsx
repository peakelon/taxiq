"use client";

import { useMemo, useState } from "react";
import { learnContent } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = ["All", "Tax 101", "Strategies", "Wealth Building", "Glossary"];

export default function LearnPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      learnContent.filter((item) => {
        const categoryMatch = category === "All" || item.category === category;
        const queryMatch =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.summary.toLowerCase().includes(query.toLowerCase());
        return categoryMatch && queryMatch;
      }),
    [category, query]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Education Hub</h1>
        <p className="text-slate-600 dark:text-slate-300">
          Tax 101, strategy deep dives, and wealth-building playbooks.
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search topics..."
            className="sm:max-w-sm"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  category === item
                    ? "border-brandGreen bg-brandGreen/10"
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {filtered.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>{article.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>{article.category}</span>
              <span>{article.readTime} read</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
