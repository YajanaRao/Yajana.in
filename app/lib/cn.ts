import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes so later arguments win over earlier ones.
 *
 * Plain template strings can't do this: `"p-2" + "p-6"` leaves both in the
 * class attribute and the winner is whichever CSS rule happens to come last in
 * the stylesheet. twMerge resolves the conflict by keyword, so a component's
 * default can always be overridden by the caller's `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
