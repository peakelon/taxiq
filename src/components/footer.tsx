"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#1a365d] dark:bg-[#60a5fa]">
              <TrendingUp className="h-4 w-4 text-white dark:text-[#0f172a]" />
            </div>
            <span className="text-sm font-semibold text-[#1a365d] dark:text-[#60a5fa]">
              TaxIQ
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-xl">
            TaxIQ provides educational tax information and strategy
            recommendations. This is not professional tax advice. Consult a
            qualified tax professional for personalized guidance.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/learn" className="hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link href="/chat" className="hover:text-foreground transition-colors">
              AI Chat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
