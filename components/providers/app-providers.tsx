"use client";

import { AppStateProvider } from "@/components/providers/app-state-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </ThemeProvider>
  );
}
