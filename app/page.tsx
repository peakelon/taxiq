import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const highlights = [
  {
    title: "Upload and parse tax docs",
    text: "Drop in W-2s and 1099s to get clean, reviewable tax data in seconds."
  },
  {
    title: "Profile-driven deduction discovery",
    text: "A guided wizard adapts to your situation and surfaces overlooked savings."
  },
  {
    title: "Legacy-style strategy engine",
    text: "Get plain-English tax and wealth strategies with implementation steps."
  }
];

const stats = [
  { label: "Potential annual savings surfaced", value: "$18,000+" },
  { label: "Guided tax profile completion", value: "~12 min" },
  { label: "Strategy recommendations", value: "10+" }
];

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="gradient-hero overflow-hidden rounded-3xl border border-slate-200 p-8 shadow-soft dark:border-slate-800 md:p-12">
        <Badge className="mb-4" variant="secondary">
          Demo-ready MVP • no API keys needed
        </Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-brandBlue dark:text-brandGreen md:text-5xl">
          Your AI tax strategist for lower taxes and faster wealth building.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
          TaxIQ turns tax prep into a proactive planning system. Understand your numbers, uncover
          deductions, and follow personalized strategies inspired by top financial educators.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button size="lg">Start TaxIQ Demo</Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" size="lg">
              Build My Tax Profile
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {stats.map((item) => (
            <Card key={item.label} className="bg-white/90 dark:bg-slate-900/70">
              <CardContent className="p-4">
                <p className="text-2xl font-semibold text-brandBlue dark:text-brandGreen">{item.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="rounded-2xl border border-brandBlue/20 bg-brandBlue p-8 text-white dark:border-brandGreen/20 dark:bg-slate-900">
        <h2 className="text-2xl font-semibold">From tax prep to tax strategy in one workflow</h2>
        <p className="mt-2 max-w-2xl text-slate-100/90 dark:text-slate-300">
          Upload documents, complete your profile wizard, apply recommended deductions, and walk
          away with an export-ready plan for your CPA.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/upload">
            <Button variant="secondary">Try Document Parsing</Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Ask the AI Tax Chat
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
