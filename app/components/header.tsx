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
import { siteMetadata } from "../constants";

const BRAND = siteMetadata.title;
const SCROLL_DISTANCE = 180;
const brandClass =
  "font-freehand font-black leading-none text-primary no-underline";

const MotionLink = motion.create(Link);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const navLinkBase =
  "relative text-lg no-underline transition-colors after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full";
const navLinkInactive = "text-foreground hover:text-foreground";
const navLinkActive = "text-primary";

function navLinkClass(active: boolean) {
  return `${navLinkBase} ${active ? navLinkActive : navLinkInactive}`;
}

type AppBarProps = {
  pathname: string;
  titleNode: React.ReactNode;
};

function AppBar({ pathname, titleNode }: AppBarProps) {
  const blogsActive = pathname === `/`;
  const notesActive = pathname.startsWith(`/notes`);
  const aboutActive = pathname.startsWith(`/about`);

  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2">
      <div className="flex items-center justify-center sm:justify-start">
        <h2 className="justify-center flex sm:justify-start mb-0 mt-0 border-0">
          {titleNode}
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-1 justify-center items-center">
        <div>
          <Link
            prefetch="intent"
            to={`/`}
            aria-current={blogsActive ? "page" : undefined}
            className={navLinkClass(blogsActive)}
          >
            Blogs
          </Link>
        </div>
        <div>
          <Link
            prefetch="intent"
            to={`/now/`}
            aria-current={notesActive ? "page" : undefined}
            className={navLinkClass(notesActive)}
          >
            Now
          </Link>
        </div>
        <div>
          <Link
            prefetch="intent"
            to={`/about`}
            aria-current={aboutActive ? "page" : undefined}
            className={navLinkClass(aboutActive)}
          >
            About
          </Link>
        </div>
        <Switch />
      </div>
    </div>
  );
}

const Header = React.memo(function Header() {
  const { pathname } = useLocation();
  const isRoot = pathname === `/`;

  if (!isRoot) {
    return (
      <header className="mb-1 flex flex-col items-center justify-center not-prose">
        <AppBar
          pathname={pathname}
          titleNode={
            <Link
              prefetch="intent"
              to={`/`}
              className={`text-3xl ${brandClass}`}
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
      <header className="sticky top-0 z-30 mb-1 flex w-full flex-col items-center justify-center bg-background/95 pt-4 pb-0 not-prose">
        <AppBar
          pathname={pathname}
          titleNode={
            <MotionLink
              prefetch="intent"
              to={`/`}
              className={`block text-3xl ${brandClass}`}
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
