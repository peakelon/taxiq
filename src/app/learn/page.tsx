"use client";

import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Lightbulb,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockEducation } from "@/lib/mock-data";

const categoryIcons: Record<string, typeof BookOpen> = {
  "Tax 101": BookOpen,
  "Strategy Deep Dive": Lightbulb,
  "Wealth Building": TrendingUp,
};

const categoryColors: Record<string, string> = {
  "Tax 101": "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  "Strategy Deep Dive":
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  "Wealth Building":
    "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400",
};

export default function LearnPage() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(mockEducation.map((e) => e.category))];

  const filtered = mockEducation.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const article = mockEducation.find((a) => a.id === selectedArticle);

  if (article) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => setSelectedArticle(null)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Button>

        <Badge className={categoryColors[article.category] || ""}>
          {article.category}
        </Badge>
        <h1 className="text-3xl font-bold mt-3 mb-2">{article.title}</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Clock className="h-4 w-4" />
          {article.readTime} read
        </div>

        <Card>
          <CardContent className="pt-6 prose prose-sm dark:prose-invert max-w-none">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-6 border-[#1a365d]/20 dark:border-[#60a5fa]/20 bg-[#1a365d]/5 dark:bg-[#60a5fa]/5">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground italic">
              This content is for educational purposes only and does not
              constitute professional tax advice. Tax laws change frequently.
              Consult a qualified tax professional for guidance specific to
              your situation.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Education Hub</h1>
        <p className="text-muted-foreground mt-1">
          Learn tax fundamentals, deep-dive into strategies, and build your
          wealth playbook.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {categories.map((cat) => (
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
      </div>

      {/* Featured Article */}
      {activeCategory === "All" && !searchQuery && (
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#1a365d] to-[#2d4a7a] dark:from-[#1e293b] dark:to-[#334155] p-8">
            <Badge className="bg-white/20 text-white mb-3">Featured</Badge>
            <h2 className="text-2xl font-bold text-white mb-2">
              {mockEducation[4].title}
            </h2>
            <p className="text-white/80 text-sm mb-4 max-w-xl">
              {mockEducation[4].description}
            </p>
            <Button
              onClick={() => setSelectedArticle(mockEducation[4].id)}
              className="bg-[#38a169] hover:bg-[#2f855a] text-white"
            >
              Read Article
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => {
          const Icon = categoryIcons[article.category] || BookOpen;
          return (
            <Card
              key={article.id}
              className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedArticle(article.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-lg bg-[#1a365d]/10 dark:bg-[#60a5fa]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#1a365d] dark:text-[#60a5fa]" />
                  </div>
                  <Badge
                    className={categoryColors[article.category] || ""}
                    variant="secondary"
                  >
                    {article.category}
                  </Badge>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-[#1a365d] dark:group-hover:text-[#60a5fa] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                  <span className="text-[#1a365d] dark:text-[#60a5fa] font-medium group-hover:underline">
                    Read more →
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground">No articles found</p>
        </div>
      )}
    </div>
  );
}
