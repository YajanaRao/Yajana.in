import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow above a title — the accent's one content touchpoint, legitimate
 * because it's a positional marker rather than a colored heading. Small-caps,
 * above the title only.
 */
export function Kicker({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("kicker m-0 mb-2 text-sm", className)} {...props} />;
}
