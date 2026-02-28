import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/upload", label: "Upload" },
  { href: "/profile", label: "Profile" },
  { href: "/deductions", label: "Deductions" },
  { href: "/strategies", label: "Strategies" },
  { href: "/learn", label: "Learn" },
  { href: "/chat", label: "Chat" },
  { href: "/summary", label: "Summary" }
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-brandBlue dark:text-brandGreen">
          TaxIQ
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-4 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition hover:text-brandBlue dark:text-slate-300 dark:hover:text-brandGreen"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm">Demo Account</Button>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
