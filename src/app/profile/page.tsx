"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  Home,
  Heart,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Income Sources", icon: Briefcase },
  { id: 3, title: "Life Events", icon: Heart },
  { id: 4, title: "Business Details", icon: Home },
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

const lifeEventOptions = [
  "Got married",
  "Had a baby",
  "Bought a home",
  "Sold a home",
  "Started a side business",
  "Changed jobs",
  "Retired",
  "Got divorced",
  "Went back to school",
  "Received inheritance",
  "Made large charitable donation",
  "Had significant medical expenses",
];

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    filingStatus: "married_jointly",
    dependents: "2",
    state: "California",
    occupation: "Software Engineer",
    incomes: [
      { type: "W-2", source: "TechCorp Inc.", amount: "145000" },
      { type: "1099-NEC", source: "Freelance Consulting", amount: "62000" },
    ],
    lifeEvents: ["Had a baby", "Started a side business"],
    hasBusinessIncome: true,
    entityType: "sole_proprietor",
    homeOffice: true,
    homeOfficeSquareFeet: "250",
    vehicleForBusiness: true,
    businessMiles: "4800",
  });

  const [newIncome, setNewIncome] = useState({
    type: "W-2",
    source: "",
    amount: "",
  });

  const updateField = (field: string, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleLifeEvent = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      lifeEvents: prev.lifeEvents.includes(event)
        ? prev.lifeEvents.filter((e) => e !== event)
        : [...prev.lifeEvents, event],
    }));
  };

  const addIncome = () => {
    if (newIncome.source && newIncome.amount) {
      setFormData((prev) => ({
        ...prev,
        incomes: [...prev.incomes, { ...newIncome }],
      }));
      setNewIncome({ type: "W-2", source: "", amount: "" });
    }
  };

  const removeIncome = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      incomes: prev.incomes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tax Profile</h1>
        <p className="text-muted-foreground mt-1">
          Complete your profile to get personalized deductions and strategy
          recommendations.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.id)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? "bg-[#38a169] dark:bg-[#48bb78] text-white"
                      : isCurrent
                        ? "bg-[#1a365d] dark:bg-[#60a5fa] text-white dark:text-[#0f172a]"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </button>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? "bg-[#38a169] dark:bg-[#48bb78]" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Filing Status</Label>
                <Select
                  value={formData.filingStatus}
                  onValueChange={(v) => updateField("filingStatus", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married_jointly">
                      Married Filing Jointly
                    </SelectItem>
                    <SelectItem value="married_separately">
                      Married Filing Separately
                    </SelectItem>
                    <SelectItem value="head_of_household">
                      Head of Household
                    </SelectItem>
                    <SelectItem value="qualifying_widow">
                      Qualifying Surviving Spouse
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    min="0"
                    value={formData.dependents}
                    onChange={(e) => updateField("dependents", e.target.value)}
                  />
                </div>
                <div>
                  <Label>State of Residence</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(v) => updateField("state", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => updateField("occupation", e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="space-y-3">
                {formData.incomes.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <Badge variant="secondary">{inc.type}</Badge>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{inc.source}</div>
                    </div>
                    <div className="text-sm font-semibold">
                      ${Number(inc.amount).toLocaleString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIncome(i)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">
                  Add Income Source
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Select
                    value={newIncome.type}
                    onValueChange={(v) =>
                      setNewIncome((prev) => ({ ...prev, type: v }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="W-2">W-2 Employment</SelectItem>
                      <SelectItem value="1099-NEC">1099-NEC Freelance</SelectItem>
                      <SelectItem value="1099-INT">1099-INT Interest</SelectItem>
                      <SelectItem value="1099-DIV">1099-DIV Dividends</SelectItem>
                      <SelectItem value="1099-B">1099-B Investments</SelectItem>
                      <SelectItem value="K-1">K-1 Partnership</SelectItem>
                      <SelectItem value="Rental">Rental Income</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Source name"
                    value={newIncome.source}
                    onChange={(e) =>
                      setNewIncome((prev) => ({
                        ...prev,
                        source: e.target.value,
                      }))
                    }
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Amount"
                      type="number"
                      value={newIncome.amount}
                      onChange={(e) =>
                        setNewIncome((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      }
                    />
                    <Button onClick={addIncome} className="shrink-0">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <p className="text-sm text-muted-foreground">
                Select any life events that occurred in the tax year. These
                help us find additional deductions and credits.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lifeEventOptions.map((event) => {
                  const selected = formData.lifeEvents.includes(event);
                  return (
                    <button
                      key={event}
                      onClick={() => toggleLifeEvent(event)}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                        selected
                          ? "border-[#38a169] bg-[#38a169]/5 dark:border-[#48bb78] dark:bg-[#48bb78]/5"
                          : "hover:bg-muted"
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="h-5 w-5 text-[#38a169] dark:text-[#48bb78] shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <span className="text-sm font-medium">{event}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <div className="font-medium">Do you have business income?</div>
                  <div className="text-sm text-muted-foreground">
                    Freelance, consulting, or business ownership
                  </div>
                </div>
                <Switch
                  checked={formData.hasBusinessIncome}
                  onCheckedChange={(v) => updateField("hasBusinessIncome", v)}
                />
              </div>

              {formData.hasBusinessIncome && (
                <>
                  <div>
                    <Label>Business Entity Type</Label>
                    <Select
                      value={formData.entityType}
                      onValueChange={(v) => updateField("entityType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietor">
                          Sole Proprietor
                        </SelectItem>
                        <SelectItem value="single_member_llc">
                          Single-Member LLC
                        </SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="s_corp">S-Corporation</SelectItem>
                        <SelectItem value="c_corp">C-Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Home Office</div>
                      <div className="text-sm text-muted-foreground">
                        Do you use a dedicated space at home for business?
                      </div>
                    </div>
                    <Switch
                      checked={formData.homeOffice}
                      onCheckedChange={(v) => updateField("homeOffice", v)}
                    />
                  </div>

                  {formData.homeOffice && (
                    <div>
                      <Label htmlFor="sqft">Home Office Square Footage</Label>
                      <Input
                        id="sqft"
                        type="number"
                        value={formData.homeOfficeSquareFeet}
                        onChange={(e) =>
                          updateField("homeOfficeSquareFeet", e.target.value)
                        }
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Simplified method: $5/sq ft, max 300 sq ft ($1,500
                        max)
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Vehicle for Business</div>
                      <div className="text-sm text-muted-foreground">
                        Do you use a personal vehicle for business travel?
                      </div>
                    </div>
                    <Switch
                      checked={formData.vehicleForBusiness}
                      onCheckedChange={(v) =>
                        updateField("vehicleForBusiness", v)
                      }
                    />
                  </div>

                  {formData.vehicleForBusiness && (
                    <div>
                      <Label htmlFor="miles">Business Miles Driven</Label>
                      <Input
                        id="miles"
                        type="number"
                        value={formData.businessMiles}
                        onChange={(e) =>
                          updateField("businessMiles", e.target.value)
                        }
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        2025 standard mileage rate: $0.70/mile
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStep < 4 ? (
              <Button
                onClick={() =>
                  setCurrentStep((prev) => Math.min(4, prev + 1))
                }
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-[#38a169] hover:bg-[#2f855a] text-white">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
