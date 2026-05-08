import React from "react";
import { Link, useLocation } from "react-router";
import Hero from "./hero";
import Switch from "./switch";

const HOME_HEADER_SCROLL_DISTANCE = 180;

type NameMetrics = {
  fontSize: number;
  left: number;
  top: number;
};

type AnimatedNameStyle = NameMetrics & {
  progress: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function interpolate(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

const navLinkClassName = "text-lg no-underline hover:underline";

type AppBarProps = {
  isRoot: boolean;
  pathname: string;
  targetNameRef?: React.Ref<HTMLSpanElement>;
};

function AppBar({ isRoot, pathname, targetNameRef }: AppBarProps) {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2">
      <div className="flex items-center justify-center sm:justify-start">
        <h2 className="justify-center flex sm:justify-start mb-0 mt-0 border-0">
          {isRoot ? (
            <span
              ref={targetNameRef}
              className="block text-3xl font-freehand font-black leading-none text-black opacity-0 dark:text-white"
            >
              Yajana Rao
            </span>
          ) : (
            <Link
              prefetch="intent"
              className="text-3xl font-freehand text-black dark:text-white no-underline"
              to={`/`}
            >
              Yajana Rao
            </Link>
          )}
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-1 justify-center items-center">
        <Link
          prefetch="intent"
          to={`/`}
          aria-current={pathname === `/` ? "page" : undefined}
          className={navLinkClassName}
        >
          Blogs
        </Link>
        <Link
          prefetch="intent"
          to={`/notes/`}
          aria-current={pathname.startsWith(`/notes`) ? "page" : undefined}
          className={navLinkClassName}
        >
          Notes
        </Link>
        <Link
          prefetch="intent"
          to={`/about`}
          aria-current={pathname.startsWith(`/about`) ? "page" : undefined}
          className={navLinkClassName}
        >
          About
        </Link>
        <Switch />
      </div>
    </div>
  );
}

const Header = React.memo(function Header() {
  const rootPath = `/`;
  const { pathname } = useLocation();
  const isRoot = pathname === rootPath;
  const sourceNameRef = React.useRef<HTMLAnchorElement>(null);
  const targetNameRef = React.useRef<HTMLSpanElement>(null);
  const sourceMetricsRef = React.useRef<NameMetrics | null>(null);
  const [animatedNameStyle, setAnimatedNameStyle] =
    React.useState<AnimatedNameStyle | null>(null);
  const scrollProgress = animatedNameStyle?.progress ?? 0;

  React.useEffect(() => {
    if (!isRoot) {
      sourceMetricsRef.current = null;
      setAnimatedNameStyle(null);
      return;
    }

    let frameId = 0;

    const resetSourceMetrics = () => {
      sourceMetricsRef.current = null;
    };

    const updateNamePosition = () => {
      frameId = 0;

      if (!sourceNameRef.current || !targetNameRef.current) {
        return;
      }

      const sourceRect = sourceNameRef.current.getBoundingClientRect();
      const targetRect = targetNameRef.current.getBoundingClientRect();
      const sourceFontSize = Number.parseFloat(
        window.getComputedStyle(sourceNameRef.current).fontSize
      );
      const targetFontSize = Number.parseFloat(
        window.getComputedStyle(targetNameRef.current).fontSize
      );

      sourceMetricsRef.current ||= {
        fontSize: sourceFontSize,
        left: sourceRect.left,
        top: sourceRect.top + window.scrollY,
      };

      const sourceMetrics = sourceMetricsRef.current;
      const progress = clamp(window.scrollY / HOME_HEADER_SCROLL_DISTANCE, 0, 1);

      setAnimatedNameStyle({
        fontSize: interpolate(
          sourceMetrics.fontSize,
          targetFontSize,
          progress
        ),
        left: interpolate(sourceMetrics.left, targetRect.left, progress),
        progress,
        top: interpolate(sourceMetrics.top, targetRect.top, progress),
      });
    };

    const requestNamePositionUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateNamePosition);
    };

    requestNamePositionUpdate();
    window.addEventListener("scroll", requestNamePositionUpdate, {
      passive: true,
    });
    const handleResize = () => {
      resetSourceMetrics();
      requestNamePositionUpdate();
    };

    window.addEventListener("resize", handleResize);

    document.fonts?.ready.then(() => {
      resetSourceMetrics();
      requestNamePositionUpdate();
    });

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestNamePositionUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [isRoot]);

  if (!isRoot) {
    return (
      <header
        className="mb-1"
        style={{
          display: `flex`,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar isRoot={isRoot} pathname={pathname} />
      </header>
    );
  }

  const heroOpacity = clamp(1 - scrollProgress * 1.25, 0, 1);
  const heroTranslateY = -24 * scrollProgress;

  return (
    <>
      <header
        className="fixed left-1/2 top-0 z-30 w-full max-w-screen-md -translate-x-1/2 px-8 pt-4 pb-0 backdrop-blur-sm"
        style={{
          display: `flex`,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar
          isRoot={isRoot}
          pathname={pathname}
          targetNameRef={targetNameRef}
        />
      </header>
      <header
        aria-hidden="true"
        className="invisible mb-1 w-full px-8 pt-4 pb-0"
        style={{
          display: `flex`,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppBar isRoot={isRoot} pathname={pathname} />
      </header>
      {animatedNameStyle ? (
        <Link
          prefetch="intent"
          className="fixed z-40 font-freehand font-black leading-none text-black no-underline dark:text-white"
          style={{
            fontSize: animatedNameStyle.fontSize,
            left: animatedNameStyle.left,
            top: animatedNameStyle.top,
            willChange: "font-size, left, top",
          }}
          to={`/`}
        >
          Yajana Rao
        </Link>
      ) : null}
      <div
        aria-hidden={scrollProgress === 1}
        className={scrollProgress === 1 ? "pointer-events-none" : ""}
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslateY}px)`,
        }}
      >
        <Hero
          titleSlot={
            <Link
              ref={sourceNameRef}
              className={`text-5xl font-freehand font-black leading-none no-underline ${
                animatedNameStyle ? "opacity-0" : ""
              }`}
              to={`/`}
            >
              Yajana Rao
            </Link>
          }
        />
      </div>
    </>
  );
});

export default Header;
