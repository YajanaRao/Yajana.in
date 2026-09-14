import * as React from "react";
import { cn } from "@/lib/cn";

const SVG_NS = "http://www.w3.org/2000/svg";
const DEFAULT_ROUGHNESS = 0.5;

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

function readAccent(alpha = 1): string {
  const fallback = alpha < 1 ? `rgba(255, 198, 0, ${alpha})` : "#FFC600";
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--primary")
    .trim();
  if (!raw) return fallback;
  return alpha < 1 ? `hsl(${raw} / ${alpha})` : `hsl(${raw})`;
}

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

function brushPatchPath(
  x0: number,
  x1: number,
  top: number,
  height: number,
  amp: number,
  rand: () => number
): string {
  const w = Math.max(1, x1 - x0);
  const n = Math.max(3, Math.round(w / 40));
  const overL = height * (0.1 + rand() * 0.15);
  const overR = height * (0.1 + rand() * 0.15);
  const tilt = (rand() * 2 - 1) * height * 0.08;
  const edgeAmp = amp + height * 0.045;
  const xa = x0 - overL;
  const span = x1 + overR - xa;
  const topAt = (t: number) => top + height * 0.02 + tilt * t;
  const botAt = (t: number) => top + height * 0.98 + tilt * t;
  const jitter = () => (rand() * 2 - 1) * edgeAmp;

  let d = `M ${xa.toFixed(2)} ${(topAt(0) + jitter()).toFixed(2)}`;
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    d += ` L ${(xa + t * span).toFixed(2)} ${(topAt(t) + jitter()).toFixed(2)}`;
  }
  for (let i = n; i >= 0; i--) {
    const t = i / n;
    d += ` L ${(xa + t * span).toFixed(2)} ${(botAt(t) + jitter()).toFixed(2)}`;
  }
  return d + " Z";
}

function ensureKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("annotate-wipe-kf")) return;
  const style = document.createElement("style");
  style.id = "annotate-wipe-kf";
  style.textContent =
    "@keyframes annotate-wipe { to { transform: scaleX(1); } }";
  document.head.appendChild(style);
}

type HighlightOptions = {
  multiline?: boolean;
  roughness?: number;
  alpha?: number;
};

function useHighlight(
  ref: React.RefObject<HTMLElement>,
  { multiline = false, roughness = DEFAULT_ROUGHNESS, alpha }: HighlightOptions
) {
  const reducedMotion = usePrefersReducedMotion();
  const seedRef = React.useRef<number>();
  if (seedRef.current === undefined) seedRef.current = seedCounter++;

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    ensureKeyframes();

    const seed = seedRef.current!;
    const amp = roughness * 0.8;

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

    el.insertAdjacentElement("beforebegin", svg);
    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }

    let shown = false;

    const paint = (reveal: boolean, animate: boolean) => {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      const svgRect = svg.getBoundingClientRect();
      const rects = multiline
        ? Array.from(el.getClientRects())
        : [el.getBoundingClientRect()];
      const color = readAccent(alpha ?? 0.4);
      const totalW = rects.reduce((sum, r) => sum + r.width, 0) || 1;
      const rand = mulberry32(seed);
      let delay = 0;

      rects.forEach((r) => {
        const localX = r.left - svgRect.left;
        const localTop = r.top - svgRect.top;
        const path = document.createElementNS(SVG_NS, "path");
        const st = path.style;
        const dur = Math.max(180, Math.round(650 * (r.width / totalW)));

        path.setAttribute(
          "d",
          brushPatchPath(localX, localX + r.width, localTop, r.height, amp, rand)
        );
        path.setAttribute("fill", color);
        st.transformBox = "fill-box";
        st.transformOrigin = "left center";
        svg.appendChild(path);

        if (!reveal) {
          st.transform = "scaleX(0)";
        } else if (animate) {
          st.transform = "scaleX(0)";
          st.animation = `annotate-wipe ${dur}ms ease-out ${delay}ms forwards`;
          delay += dur;
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

    const themeObserver = new MutationObserver(() => paint(shown, false));
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let raf = 0;
    const reflow = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paint(shown, false));
    };
    window.addEventListener("resize", reflow, { passive: true });
    const ro = "ResizeObserver" in window ? new ResizeObserver(reflow) : null;
    ro?.observe(el);

    return () => {
      io?.disconnect();
      themeObserver.disconnect();
      ro?.disconnect();
      window.removeEventListener("resize", reflow);
      cancelAnimationFrame(raf);
      svg.remove();
    };
  }, [ref, multiline, roughness, alpha, reducedMotion]);
}

type WrapperProps = React.HTMLAttributes<HTMLSpanElement> & {
  roughness?: number;
  multiline?: boolean;
};

export function Highlight({
  className,
  children,
  roughness,
  multiline,
  solid = false,
  ...props
}: WrapperProps & { solid?: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useHighlight(ref, {
    roughness,
    multiline,
    alpha: solid ? 1 : undefined,
  });

  return (
    <span
      ref={ref}
      className={cn(
        solid ? "text-primary-foreground" : "text-ink-primary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
