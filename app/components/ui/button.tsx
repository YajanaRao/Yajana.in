import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * DESIGN.md: the gold fill is the only broad accent fill in the system, and it
 * earns it by being the single most important action on a page. If a page has
 * several actions, one is `primary` and the rest are `secondary` outlines.
 */
const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary:
    "border border-primary bg-transparent text-primary hover:bg-primary-container",
  ghost: "bg-transparent text-ink-secondary hover:bg-accent hover:text-accent-foreground",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Chrome rounding is 3px (rounded-sm) and motion is the 130ms action register.
const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium " +
  "transition-colors duration-action ease-action " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:pointer-events-none disabled:opacity-50 no-underline";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
