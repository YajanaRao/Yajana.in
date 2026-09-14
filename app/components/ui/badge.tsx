import * as React from "react";
import { cn } from "@/lib/cn";

const variants = {
  resting: "bg-surface-recessed1 text-ink-secondary border-transparent",
  active: "bg-transparent text-primary border-primary",
  outline: "bg-transparent text-ink-secondary border-border",
} as const;

export type BadgeVariant = keyof typeof variants;

const base =
  "inline-flex items-center border px-3.5 py-1.5 font-ui text-sm " +
  "transition-colors duration-action ease-action";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "resting",
  ...props
}: BadgeProps) {
  return <span className={cn(base, variants[variant], className)} {...props} />;
}

export interface BadgeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BadgeVariant;
}

export function BadgeButton({
  className,
  variant = "resting",
  type = "button",
  ...props
}: BadgeButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        variants[variant],
        "hover:opacity-75",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      {...props}
    />
  );
}
