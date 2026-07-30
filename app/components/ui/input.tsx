import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * The resting affordance is tone, not a stroke: surface.recessed2 (DESIGN.md's
 * border tone) measures only 1.11:1 against the page, so a 1px rule alone
 * cannot signal "this is a control". The recessed1 fill does that job, with a
 * faint 1px definition line and a gold focus ring carrying the focus state.
 *
 * Chrome rounding is 3px — DESIGN.md reserves rounded-full for genuinely
 * circular elements, never a container pretending to be soft.
 */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full appearance-none rounded-sm border border-input bg-surface-recessed1",
        "px-5 py-5 font-ui text-lg leading-tight text-ink-primary",
        "placeholder:text-ink-secondary",
        "transition-colors duration-action ease-action",
        // Ring hugs the field: an offset ring reads as a detached second box,
        // and on a full-width input that becomes the loudest thing on the page.
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
        // The native search-cancel glyph is restyled in globals.css — it needs a
        // masked SVG, which doesn't survive Tailwind's arbitrary-value parser.
        className
      )}
      {...props}
    />
  );
});
