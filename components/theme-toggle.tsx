"use client";

import { useTheme } from "@/components/providers/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme}>
      {theme === "dark" ? "Light" : "Dark"} mode
    </Button>
  );
}
