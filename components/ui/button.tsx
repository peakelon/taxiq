import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "secondary" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-brandBlue text-white hover:bg-brandBlue/90 dark:bg-brandGreen dark:text-slate-950 dark:hover:bg-brandGreen/90",
  outline: "border border-slate-300 bg-transparent hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800",
  secondary: "bg-brandGreen text-white hover:bg-brandGreen/90",
  ghost: "hover:bg-slate-100 dark:hover:bg-slate-800"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGreen/60 disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
