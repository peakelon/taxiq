"use client";

import { useMemo, useState } from "react";
import { useAppState } from "@/components/providers/app-state-provider";
import { lifeEventOptions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import type { EntityType, FilingStatus } from "@/lib/types";

const steps = ["Filing", "Income", "Life events", "Business"];

export default function ProfilePage() {
  const { profile, updateProfile } = useAppState();
  const [step, setStep] = useState(0);

  const stepProgress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brandBlue dark:text-brandGreen">Smart Profile Builder</h1>
        <p className="text-slate-600 dark:text-slate-300">Wizard-style flow for personalized recommendations.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>
              Step {step + 1}: {steps[step]}
            </CardTitle>
            <Badge variant="secondary">{Math.round(stepProgress)}% complete</Badge>
          </div>
          <CardDescription>Complete your profile to unlock targeted deductions and strategy cards.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={stepProgress} />

          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Filing status</p>
                <Select
                  value={profile.filingStatus}
                  onChange={(event) =>
                    updateProfile({ filingStatus: event.target.value as FilingStatus })
                  }
                >
                  <option value="single">Single</option>
                  <option value="married">Married filing jointly</option>
                  <option value="head_of_household">Head of household</option>
                </Select>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Dependents</p>
                <Input
                  type="number"
                  min={0}
                  value={profile.dependents}
                  onChange={(event) => updateProfile({ dependents: Number(event.target.value) || 0 })}
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-sm font-medium">State of residence</p>
                <Input
                  value={profile.state}
                  onChange={(event) => updateProfile({ state: event.target.value })}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <MoneyField
                label="W-2 income"
                value={profile.w2Income}
                onChange={(value) => updateProfile({ w2Income: value })}
              />
              <MoneyField
                label="1099 income"
                value={profile.income1099}
                onChange={(value) => updateProfile({ income1099: value })}
              />
              <MoneyField
                label="Business income"
                value={profile.businessIncome}
                onChange={(value) => updateProfile({ businessIncome: value })}
              />
              <MoneyField
                label="Rental income"
                value={profile.rentalIncome}
                onChange={(value) => updateProfile({ rentalIncome: value })}
              />
              <MoneyField
                label="Investment income"
                value={profile.investmentIncome}
                onChange={(value) => updateProfile({ investmentIncome: value })}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Select all that apply for this tax year.
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {lifeEventOptions.map((eventLabel) => {
                  const selected = profile.lifeEvents.includes(eventLabel);
                  return (
                    <button
                      type="button"
                      key={eventLabel}
                      className={`rounded-lg border p-3 text-left text-sm transition ${
                        selected
                          ? "border-brandGreen bg-brandGreen/10"
                          : "border-slate-200 hover:border-brandBlue dark:border-slate-700"
                      }`}
                      onClick={() => {
                        const next = selected
                          ? profile.lifeEvents.filter((item) => item !== eventLabel)
                          : [...profile.lifeEvents, eventLabel];
                        updateProfile({ lifeEvents: next });
                      }}
                    >
                      {eventLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 sm:col-span-2">
                <p className="text-sm font-medium">Business entity type</p>
                <Select
                  value={profile.entityType}
                  onChange={(event) => updateProfile({ entityType: event.target.value as EntityType })}
                >
                  <option value="none">None</option>
                  <option value="sole_prop">Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="s_corp">S-Corp</option>
                </Select>
              </div>
              <ToggleTile
                label="Dedicated home office"
                enabled={profile.homeOffice}
                onToggle={() => updateProfile({ homeOffice: !profile.homeOffice })}
              />
              <ToggleTile
                label="Business vehicle use"
                enabled={profile.vehicleUse}
                onToggle={() => updateProfile({ vehicleUse: !profile.vehicleUse })}
              />
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
            <Button onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}>
              {step === steps.length - 1 ? "Finish Profile" : "Next Step"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MoneyField({
  label,
  value,
  onChange
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium">{label}</p>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
      />
    </div>
  );
}

function ToggleTile({ label, enabled, onToggle }: { label: string; enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-lg border p-4 text-left transition ${
        enabled
          ? "border-brandGreen bg-brandGreen/10"
          : "border-slate-200 hover:border-brandBlue dark:border-slate-700"
      }`}
    >
      <p className="font-medium">{label}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{enabled ? "Enabled" : "Not enabled"}</p>
    </button>
  );
}
