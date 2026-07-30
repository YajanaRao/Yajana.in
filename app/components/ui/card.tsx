import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Elevation is tonal, never emissive — no shadow, no blur, no decorative
 * border. The card reads as its own plane through `bg-card` plus the space
 * around it, at content rounding (10px).
 *
 * `bg-card` resolves to surface.recessed1 rather than surface.raised: body copy
 * on light raised measures 4.29:1, below AA. See the [AA] notes in globals.css.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a semantic element instead of a div (e.g. "article" in a list). */
  as?: "div" | "article" | "section" | "li";
  /**
   * Adds the hover elevation step. Note hover lands on surface.raised, where
   * light-mode body copy measures 4.29:1 — acceptable on a transient state, but
   * the reason cards rest on surface.recessed1 rather than raised.
   */
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { as: Tag = "div", className, interactive = false, ...props },
  ref
) {
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(
        "rounded-lg bg-card text-card-foreground not-prose",
        interactive &&
          "transition-colors duration-action ease-action hover:bg-accent hover:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...props }, ref) {
  return <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />;
});

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className, ...props }, ref) {
  return (
    <h2
      ref={ref}
      className={cn(
        "m-0 font-heading text-2xl font-extrabold italic text-ink-primary",
        className
      )}
      {...props}
    />
  );
});

/** Meta line — dates, bylines. ink.secondary, not ink.comment (AA). */
const CardMeta = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardMeta({ className, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("m-0 font-ui text-sm text-ink-secondary", className)}
      {...props}
    />
  );
});

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("mt-4", className)} {...props} />;
});

export { Card, CardHeader, CardTitle, CardMeta, CardContent };
