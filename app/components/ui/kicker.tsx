import * as React from "react";
import { cn } from "@/lib/cn";

export function Kicker({
  className,
  dot = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { dot?: boolean }) {
  return (
    <p
      className={cn("kicker m-0", dot && "flex items-center gap-2", className)}
      {...props}
    >
      {dot && (
        <span
          className="inline-block size-1.5 shrink-0 bg-primary"
          aria-hidden="true"
        />
      )}
      {children}
    </p>
  );
}
