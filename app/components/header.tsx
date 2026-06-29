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

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

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

  const titleRef = React.useRef<HTMLAnchorElement>(null);
  const heroAnchorRef = React.useRef<HTMLSpanElement>(null);
  const deltaRef = React.useRef({ dx: 0, dy: 0, scale: 1 });

  const { scrollY } = useScroll();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const titleOpacity = useMotionValue(0);
  const heroOpacity = useMotionValue(1);
  const heroY = useMotionValue(0);

  const applyScroll = React.useCallback(
    (value: number) => {
      const progress = clamp(value / SCROLL_DISTANCE, 0, 1);
      const rest = 1 - progress;
      const { dx, dy, scale: s } = deltaRef.current;
      x.set(dx * rest);
      y.set(dy * rest);
      scale.set(1 + (s - 1) * rest);
      heroOpacity.set(clamp(1 - value / (SCROLL_DISTANCE * 0.8), 0, 1));
      heroY.set(-24 * progress);
    },
    [x, y, scale, heroOpacity, heroY]
  );

  useMotionValueEvent(scrollY, "change", applyScroll);

  useIsomorphicLayoutEffect(() => {
    if (!isRoot) return;

    const measure = () => {
      const title = titleRef.current;
      const anchor = heroAnchorRef.current;
      if (!title || !anchor) return;

      const t = title.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const dockFont = Number.parseFloat(
        window.getComputedStyle(title).fontSize
      );
      const targetFont = Number.parseFloat(
        window.getComputedStyle(anchor).fontSize
      );
      const dockedCx = t.left + t.width / 2 - x.get();
      const dockedCy = t.top + t.height / 2 - y.get();

      deltaRef.current = {
        dx: a.left + a.width / 2 - dockedCx,
        dy: a.top + a.height / 2 - dockedCy,
        scale: dockFont ? targetFont / dockFont : 1,
      };

      applyScroll(window.scrollY);
    };

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      measure();
      raf2 = requestAnimationFrame(() => {
        measure();
        titleOpacity.set(1);
      });
    });

    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("load", measure);
    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [isRoot, applyScroll, x, y, titleOpacity]);

  const titleNode = isRoot ? (
    <MotionLink
      ref={titleRef}
      prefetch="intent"
      to={`/`}
      className={`block text-3xl ${brandClass}`}
      style={{
        x,
        y,
        scale,
        opacity: titleOpacity,
        transformOrigin: "center",
        willChange: "transform",
      }}
    >
      {BRAND}
    </MotionLink>
  ) : (
    <Link prefetch="intent" to={`/`} className={`text-3xl ${brandClass}`}>
      {BRAND}
    </Link>
  );

  if (!isRoot) {
    return (
      <header className="mb-1 flex flex-col items-center justify-center not-prose">
        <AppBar pathname={pathname} titleNode={titleNode} />
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 mb-1 flex w-full flex-col items-center justify-center bg-background/95 pt-4 pb-0 not-prose">
        <AppBar pathname={pathname} titleNode={titleNode} />
      </header>
      <motion.div style={{ opacity: heroOpacity, y: heroY }}>
        <Hero
          titleSlot={
            <span
              ref={heroAnchorRef}
              aria-hidden="true"
              className="block h-[58px] text-5xl leading-none"
            />
          }
        />
      </motion.div>
    </>
  );
});

export default Header;
