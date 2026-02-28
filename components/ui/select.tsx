import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/60 dark:border-slate-700 dark:bg-slate-950",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
