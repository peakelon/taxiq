export function cn(...classes: Array<string | undefined | false | null>): string {
  return classes.filter(Boolean).join(" ");
}

export function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function percent(value: number): string {
  return `${Math.round(value)}%`;
}
