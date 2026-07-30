import React from "react";
import { Link, useLocation } from "react-router";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Hero from "./hero";
import Switch from "./switch";
import { cn } from "@/lib/cn";
import { siteMetadata } from "../constants";

const BRAND = siteMetadata.title;
const SCROLL_DISTANCE = 180;

const brandClass = "wordmark not-prose leading-none no-underline";

const MotionLink = motion.create(Link);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
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
  { to: "/", label: "Blogs", isActive: (p: string) => p === "/" },
  {
    to: "/now/",
    label: "Now",
    isActive: (p: string) => p.startsWith("/notes"),
  },
  {
    to: "/about",
    label: "About",
    isActive: (p: string) => p.startsWith("/about"),
  },
] as const;

type AppBarProps = {
  pathname: string;
  titleNode: React.ReactNode;
};

function AppBar({ pathname, titleNode }: AppBarProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      <div className="flex items-center justify-center sm:justify-start">
        <h2 className="m-0 flex border-0 not-prose">{titleNode}</h2>
      </div>
      <nav
        aria-label="Main"
        className="flex items-center justify-center gap-8 sm:justify-end"
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

  if (!isRoot) {
    return (
      <header className="flex flex-col items-center justify-center not-prose">
        <AppBar
          pathname={pathname}
          titleNode={
            <Link
              prefetch="intent"
              to={`/`}
              className={cn("text-3xl", brandClass)}
            >
              {BRAND}
            </Link>
          }
        />
      </header>
    );
  }

  return <RootHeader pathname={pathname} />;
});

function RootHeader({ pathname }: { pathname: string }) {
  const { scrollY } = useScroll();

  const heroOpacity = useMotionValue(1);
  const heroY = useMotionValue(0);
  const navTitleOpacity = useMotionValue(0);
  const navTitleY = useMotionValue(-6);

  const applyScroll = React.useCallback(
    (value: number) => {
      const progress = clamp(value / SCROLL_DISTANCE, 0, 1);
      heroOpacity.set(clamp(1 - value / (SCROLL_DISTANCE * 0.8), 0, 1));
      heroY.set(-24 * progress);
      navTitleOpacity.set(progress);
      navTitleY.set(-6 * (1 - progress));
    },
    [heroOpacity, heroY, navTitleOpacity, navTitleY]
  );

  useMotionValueEvent(scrollY, "change", applyScroll);

  React.useEffect(() => {
    applyScroll(window.scrollY);
  }, [applyScroll]);

  return (
    <>
      <header className="sticky top-0 z-30 flex w-full flex-col items-center justify-center bg-background/95 pb-2 pt-4 not-prose">
        <AppBar
          pathname={pathname}
          titleNode={
            <MotionLink
              prefetch="intent"
              to={`/`}
              className={cn("block text-3xl", brandClass)}
              style={{ opacity: navTitleOpacity, y: navTitleY }}
            >
              {BRAND}
            </MotionLink>
          }
        />
      </header>
      <motion.div style={{ opacity: heroOpacity, y: heroY }}>
        <Hero />
      </motion.div>
    </>
  );
}

export default Header;
