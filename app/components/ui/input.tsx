import * as React from "react";
import { cn } from "@/lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, type = "text", ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "w-full appearance-none bg-surface-recessed1",
        "px-5 py-5 font-ui text-lg leading-tight text-ink-primary",
        "placeholder:text-ink-secondary",
        "transition-colors duration-action ease-action",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
        className
      )}
      {...props}
    />
  );
});
