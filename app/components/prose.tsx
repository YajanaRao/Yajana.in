import * as React from "react";
import { Outlet } from "react-router";
import { cn } from "@/lib/cn";

const GUTTER = "px-6 sm:px-8";
const MEASURE = "max-w-[832px]";

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "prose mx-auto w-full dark:prose-invert",
        MEASURE,
        GUTTER,
        className
      )}
    >
      {children}
    </div>
  );
}

export function WideProse({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "prose w-full max-w-none dark:prose-invert",
        GUTTER,
        className
      )}
    >
      {children}
    </div>
  );
}

export function ProseRoute() {
  return (
    <Prose>
      <Outlet />
    </Prose>
  );
}
