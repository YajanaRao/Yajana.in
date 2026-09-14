import React from "react";
import { Link, useLocation } from "react-router";
import Hero from "./hero";
import Switch from "./switch";
import { cn } from "@/lib/cn";
import { siteMetadata } from "../constants";

const BRAND = siteMetadata.title;

const homeLinkClass =
  "wordmark not-prose -translate-y-[5px] text-[2rem] leading-none no-underline transition-colors duration-action ease-action";

const headerClass =
  "flex w-full flex-col items-center justify-center pb-2 pt-4 not-prose";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("brand-mark h-[0.95em] w-[0.82em] shrink-0", className)}
    />
  );
}

const navLinkBase =
  "relative font-ui text-lg no-underline transition-colors duration-action ease-action " +
  "after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-current " +
  "after:transition-[width] after:duration-action after:ease-action hover:after:w-full " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function navLinkClass(active: boolean) {
  return cn(
    navLinkBase,
    active ? "text-primary" : "text-ink-secondary hover:text-ink-primary"
  );
}

export const NAV_ITEMS = [
  {
    to: "/blog",
    label: "Blogs",
    isActive: (p: string) => p.startsWith("/blog"),
  },
  {
    to: "/now/",
    label: "Now",
    isActive: (p: string) => p.startsWith("/now"),
  },
  {
    to: "/about",
    label: "About",
    isActive: (p: string) => p.startsWith("/about"),
  },
] as const;

type AppBarProps = {
  pathname: string;
  titleNode?: React.ReactNode;
};

function AppBar({ pathname, titleNode }: AppBarProps) {
  return (
    <div className="mx-auto grid w-full max-w-[1164px] grid-cols-1 gap-2 px-6 sm:grid-cols-2 sm:px-8">
      {titleNode ? (
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex not-prose">{titleNode}</div>
        </div>
      ) : null}
      <nav
        aria-label="Main"
        className={cn(
          "flex items-center justify-center gap-8 sm:justify-end",
          !titleNode && "sm:col-start-2"
        )}
      >
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.to}
              prefetch="intent"
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={navLinkClass(active)}
            >
              {item.label}
            </Link>
          );
        })}
        <Switch />
      </nav>
    </div>
  );
}

const Header = React.memo(function Header() {
  const { pathname } = useLocation();
  const isRoot = pathname === `/`;

  return (
    <>
      <header className={headerClass}>
        <AppBar
          pathname={pathname}
          titleNode={
            isRoot ? null : (
              <Link
                prefetch="intent"
                to={`/`}
                className={cn("flex items-center gap-2.5", homeLinkClass)}
              >
                {BRAND}
              </Link>
            )
          }
        />
      </header>
      {isRoot ? <Hero /> : null}
    </>
  );
});

export default Header;
