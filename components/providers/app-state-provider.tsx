"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  deductionCatalog,
  initialChat,
  initialDocuments,
  initialProfile,
  initialStrategies,
  priorYears
} from "@/lib/mock-data";
import type {
  ChatMessage,
  DeductionItem,
  StrategyItem,
  StrategyStatus,
  TaxDocument,
  TaxProfile,
  YearSnapshot
} from "@/lib/types";

interface AppStateContextValue {
  profile: TaxProfile;
  documents: TaxDocument[];
  deductions: DeductionItem[];
  selectedDeductionIds: string[];
  strategies: StrategyItem[];
  chatMessages: ChatMessage[];
  yearSnapshots: YearSnapshot[];
  updateProfile: (profile: Partial<TaxProfile>) => void;
  uploadDocument: (name: string, type: TaxDocument["type"]) => void;
  toggleDeduction: (id: string) => void;
  setStrategyStatus: (id: string, status: StrategyStatus) => void;
  sendChatMessage: (message: string) => void;
}

interface PersistedState {
  profile: TaxProfile;
  documents: TaxDocument[];
  selectedDeductionIds: string[];
  strategies: StrategyItem[];
  chatMessages: ChatMessage[];
}

const STORAGE_KEY = "taxiq-mock-state-v1";

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

function randomCurrency(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

function buildAssistantResponse(input: string, profile: TaxProfile): ChatMessage {
  const normalized = input.toLowerCase();

  if (normalized.includes("s-corp") || normalized.includes("self-employment")) {
    return {
      id: `chat-${crypto.randomUUID()}`,
      role: "assistant",
      content: `Given your projected business income of $${profile.businessIncome.toLocaleString()}, an S-Corp election could reduce self-employment tax. A reasonable salary analysis would be the first step before filing Form 2553.`,
      citations: ["IRC §1362", "IRS Form 2553 Instructions"],
      createdAt: new Date().toISOString()
    };
  }

  if (normalized.includes("deduction") || normalized.includes("save")) {
    return {
      id: `chat-${crypto.randomUUID()}`,
      role: "assistant",
      content:
        "Your highest-impact deductions are home office, mortgage interest, and mileage. Focus on documentation first: square footage logs, Form 1098, and contemporaneous mileage records.",
      citations: ["IRC §280A", "IRS Pub 463", "Schedule A Instructions"],
      createdAt: new Date().toISOString()
    };
  }

  return {
    id: `chat-${crypto.randomUUID()}`,
    role: "assistant",
    content:
      "Based on your profile, I suggest prioritizing retirement contributions and entity optimization this quarter. I can map a month-by-month implementation plan if you want.",
    citations: ["IRC §401(k)", "IRC §199A"],
    createdAt: new Date().toISOString()
  };
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<TaxProfile>(initialProfile);
  const [documents, setDocuments] = useState<TaxDocument[]>(initialDocuments);
  const [selectedDeductionIds, setSelectedDeductionIds] = useState<string[]>([
    "ded-1",
    "ded-2",
    "ded-4"
  ]);
  const [strategies, setStrategies] = useState<StrategyItem[]>(initialStrategies);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChat);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.documents) setDocuments(parsed.documents);
      if (parsed.selectedDeductionIds) setSelectedDeductionIds(parsed.selectedDeductionIds);
      if (parsed.strategies) setStrategies(parsed.strategies);
      if (parsed.chatMessages) setChatMessages(parsed.chatMessages);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const payload: PersistedState = {
      profile,
      documents,
      selectedDeductionIds,
      strategies,
      chatMessages
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [profile, documents, selectedDeductionIds, strategies, chatMessages]);

  const updateProfile = (updates: Partial<TaxProfile>) => {
    setProfile((current) => ({ ...current, ...updates }));
  };

  const uploadDocument = (name: string, type: TaxDocument["type"]) => {
    const wages = randomCurrency(4000, 32000);
    const withholding = Math.round(wages * 0.14);

    setDocuments((current) => [
      {
        id: `doc-${crypto.randomUUID()}`,
        name,
        type,
        status: "parsed",
        uploadedAt: new Date().toISOString(),
        parsedFields: {
          wages,
          federalWithholding: withholding,
          stateWithholding: profile.state === "Texas" ? 0 : Math.round(wages * 0.04),
          employerOrPayer: type === "W-2" ? "Northstar Holdings" : "Harbor Consulting Group",
          ein: `${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 9000000 + 1000000)}`
        }
      },
      ...current
    ]);
  };

  const toggleDeduction = (id: string) => {
    setSelectedDeductionIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const setStrategyStatus = (id: string, status: StrategyStatus) => {
    setStrategies((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const sendChatMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: `chat-${crypto.randomUUID()}`,
      role: "user",
      content: message,
      createdAt: new Date().toISOString()
    };

    const assistantMessage = buildAssistantResponse(message, profile);
    setChatMessages((current) => [...current, userMessage, assistantMessage]);
  };

  const value = useMemo(
    () => ({
      profile,
      documents,
      deductions: deductionCatalog,
      selectedDeductionIds,
      strategies,
      chatMessages,
      yearSnapshots: priorYears,
      updateProfile,
      uploadDocument,
      toggleDeduction,
      setStrategyStatus,
      sendChatMessage
    }),
    [profile, documents, selectedDeductionIds, strategies, chatMessages]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider");
  }

  return context;
}
