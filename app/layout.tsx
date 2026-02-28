import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: "TaxIQ - AI Tax Strategist",
  description:
    "TaxIQ helps you prep taxes, uncover deductions, and build smarter wealth strategies."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <SiteNav />
          <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
