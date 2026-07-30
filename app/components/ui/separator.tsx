import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * The 1px rule, used only when spacing and tone can't carry the separation on
 * their own — DESIGN.md's "no decorative borders" forbids a stroke chosen to
 * look nice, not a divider doing real work.
 *
 * Deliberately near-invisible (surface.recessed2 sits ~1.1:1 against the page).
 * That's correct for a decorative divider, and it's why interactive controls
 * must not rely on this tone for their affordance — see ui/input.tsx.
 */
export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}
