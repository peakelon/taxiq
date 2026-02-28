import * as React from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-brandBlue text-white dark:bg-brandGreen dark:text-slate-950",
  secondary: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof variantClasses }) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
