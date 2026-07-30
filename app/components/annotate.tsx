import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Hand-drawn link underlines and keyword highlights — the marks the Figma comps
 * ship as static images, drawn live here instead.
 *
 * These used to be rendered by `rough-notation`, but its curviness is hardcoded
 * and unconfigurable. This is a small in-house renderer with a `roughness` knob
 * so the marks read as *subtle* hand-drawn (mostly straight) rather than wavy.
 * It keeps rough-notation's proven mechanics: an absolute overlay <svg> measured
 * against the target, a stroke-dashoffset draw-in, scroll-into-view reveal, and
 * a redraw when the theme flips. Everything runs in an effect — never at
 * render/SSR — because it measures and mutates the DOM.
 */

const SVG_NS = "http://www.w3.org/2000/svg";
const DEFAULT_ROUGHNESS = 1;

type AnnotationType = "underline" | "highlight";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// The accent resolves from the live token, so annotations track the theme.
// `--primary` holds an HSL triple (e.g. "46.6 100% 50%"); wrap it as hsl().
// `alpha` < 1 is used for the highlight, which draws a full-height marker —
// opaque would bury the text, so it needs to read as a translucent wash.
function readAccent(alpha = 1): string {
  const fallback = alpha < 1 ? `rgba(255, 198, 0, ${alpha})` : "#FFC600";
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  if (!raw) return fallback;
  return alpha < 1 ? `hsl(${raw} / ${alpha})` : `hsl(${raw})`;
}

// Deterministic PRNG so a mark's wobble stays put across redraws (theme flip,
// resize) instead of reshuffling. Seeded per component instance via a counter.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let seedCounter = 1;

// A nearly-straight line from x0→x1 at height y. Interior points get a small
// seeded ±amp jitter; endpoints stay on the baseline. amp = 0 → dead straight.
function roughLinePath(
  x0: number,
  x1: number,
  y: number,
  amp: number,
  rand: () => number
): string {
  const width = Math.max(1, x1 - x0);
  const n = Math.max(2, Math.round(width / 34));
  let d = `M ${x0.toFixed(2)} ${y.toFixed(2)}`;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    const edge = i === n;
    const jx = edge ? 0 : (rand() * 2 - 1) * amp * 0.5;
    const jy = edge ? 0 : (rand() * 2 - 1) * amp;
    d += ` L ${(x0 + t * width + jx).toFixed(2)} ${(y + jy).toFixed(2)}`;
  }
  return d;
}

function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("annotate-dash-kf")) return;
  const style = document.createElement("style");
  style.id = "annotate-dash-kf";
  style.textContent =
    "@keyframes annotate-dash { to { stroke-dashoffset: 0; } }";
  document.head.appendChild(style);
}

type AnnotationOptions = {
  type: AnnotationType;
  multiline?: boolean;
  strokeWidth?: number;
  padding?: number;
  roughness?: number;
};

/**
 * Draw an annotation over `ref`, revealing on scroll-into-view and redrawing on
 * theme change / resize. Pure side effect.
 */
function useAnnotation(
  ref: React.RefObject<HTMLElement>,
  {
    type,
    multiline = false,
    strokeWidth = 2,
    padding = 3,
    roughness = DEFAULT_ROUGHNESS,
  }: AnnotationOptions
) {
  const reducedMotion = usePrefersReducedMotion();
  const seedRef = React.useRef<number>();
  if (seedRef.current === undefined) seedRef.current = seedCounter++;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureKeyframes();

    const seed = seedRef.current!;
    const amp = roughness * (type === "highlight" ? 0.8 : 1.1);

    // Overlay svg — placed like rough-notation: behind the text for a highlight
    // (so the text stays legible on top), after it for an underline.
    const svg = document.createElementNS(SVG_NS, "svg");
    Object.assign(svg.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100px",
      height: "100px",
      overflow: "visible",
      pointerEvents: "none",
    } as CSSStyleDeclaration);

    if (type === "highlight") {
      el.insertAdjacentElement("beforebegin", svg);
      if (getComputedStyle(el).position === "static") {
        el.style.position = "relative";
      }
    } else {
      el.insertAdjacentElement("afterend", svg);
    }

    let shown = false;

    const paint = (reveal: boolean, animate: boolean) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const svgRect = svg.getBoundingClientRect();
      const rects = multiline
        ? Array.from(el.getClientRects())
        : [el.getBoundingClientRect()];
      const color = readAccent(type === "highlight" ? 0.4 : 1);
      const totalW = rects.reduce((sum, r) => sum + r.width, 0) || 1;
      const rand = mulberry32(seed);
      let delay = 0;

      rects.forEach((r) => {
        const localX = r.left - svgRect.left;
        const localTop = r.top - svgRect.top;
        let d: string;
        let sw: number;
        if (type === "highlight") {
          const y = localTop + r.height / 2;
          sw = Math.max(r.height * 0.9, 1);
          d = roughLinePath(localX - 2, localX + r.width + 2, y, amp, rand);
        } else {
          const y = localTop + r.height + padding;
          sw = strokeWidth;
          d = roughLinePath(localX, localX + r.width, y, amp, rand);
        }

        const path = document.createElementNS(SVG_NS, "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", String(sw));
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);

        const len = path.getTotalLength();
        const st = path.style;
        if (!reveal) {
          st.strokeDasharray = String(len);
          st.strokeDashoffset = String(len);
        } else if (animate) {
          const dur = Math.max(180, Math.round(650 * (r.width / totalW)));
          st.strokeDasharray = String(len);
          st.strokeDashoffset = String(len);
          st.animation = `annotate-dash ${dur}ms ease-out ${delay}ms forwards`;
          delay += dur;
        } else {
          st.strokeDashoffset = "0";
        }
      });
    };

    const reveal = () => {
      shown = true;
      paint(true, !reducedMotion);
    };

    paint(false, false);

    let io: IntersectionObserver | null = null;
    if (reducedMotion) {
      reveal();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io?.disconnect();
          }
        },
        { threshold: 0.6 }
      );
      io.observe(el);
    }

    // Redraw (recolor) on theme flip, keeping the shown state; no re-animation.
    const themeObserver = new MutationObserver(() => paint(shown, false));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Re-measure on layout changes (rough-notation used a ResizeObserver too).
    let raf = 0;
    const reflow = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paint(shown, false));
    };
    window.addEventListener("resize", reflow, { passive: true });
    const ro =
      "ResizeObserver" in window ? new ResizeObserver(reflow) : null;
    ro?.observe(el);

    return () => {
      io?.disconnect();
      themeObserver.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", reflow);
      cancelAnimationFrame(raf);
      svg.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, type, multiline, strokeWidth, padding, roughness, reducedMotion]);
}

type AnnotatedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Open in a new tab (adds rel=noreferrer). Defaults to true for http(s). */
  external?: boolean;
  /** Wobble amount; 0 = dead straight, ~1 = subtle (default). */
  roughness?: number;
};

/**
 * An inline prose link with a drawn gold underline. Gold marks the exceptional
 * inline link (DESIGN.md, Links) — here every one of these sits amid body copy.
 */
export function AnnotatedLink({
  href,
  external,
  className,
  children,
  roughness,
  ...props
}: AnnotatedLinkProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  useAnnotation(ref, { type: "underline", multiline: true, roughness });

  const isExternal =
    external ?? (typeof href === "string" && /^https?:/.test(href));

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "font-ui font-semibold text-primary no-underline",
        className
      )}
      {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

type WrapperProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Wobble amount; 0 = dead straight, ~1 = subtle (default). */
  roughness?: number;
};

/**
 * Draws a gold underline beneath arbitrary inline children — e.g. wrapping the
 * active nav <Link>, which must stay a React Router link (so it can't be an
 * <a>-based AnnotatedLink).
 */
export function Underline({
  className,
  children,
  roughness,
  ...props
}: WrapperProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useAnnotation(ref, { type: "underline", roughness });

  return (
    <span ref={ref} className={cn("inline-block", className)} {...props}>
      {children}
    </span>
  );
}

/**
 * A drawn gold highlight behind a word or phrase — the "we will use highlights
 * as well" keyword emphasis (e.g. "wellbeing").
 */
export function Highlight({
  className,
  children,
  roughness,
  ...props
}: WrapperProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useAnnotation(ref, { type: "highlight", padding: 0, roughness });

  return (
    <span ref={ref} className={cn("text-ink-primary", className)} {...props}>
      {children}
    </span>
  );
}
