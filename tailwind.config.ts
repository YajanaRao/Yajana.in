import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// The rule sits at a constant 2px and hover intensifies its colour only. A
// thickness that changes under the cursor makes the line jump against the
// baseline; holding it steady lets the colour carry the whole hover signal.
const proseLink = {
  fontWeight: "500",
  textDecoration: "underline",
  textDecorationColor: "hsl(var(--primary) / 0.45)",
  textDecorationThickness: "2px",
  textUnderlineOffset: "3px",
  transition: "text-decoration-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1)",
};

const proseLinkHover = {
  textDecorationColor: "hsl(var(--primary))",
};

// The display tier is one weight — extrabold — with size doing the separating,
// and it stops at h2. h3/h4 render below ~32px, where the condensed face reads
// merely narrow, so they take the reading family's semibold. See globals.css
// §Type roles and DESIGN.md §Scale.
const displayHeading = {
  fontFamily: "var(--font-heading)",
  fontStyle: "normal",
  fontWeight: "800",
  letterSpacing: "-0.03em",
};
const subHeading = {
  fontFamily: "var(--font-content)",
  fontStyle: "normal",
  fontWeight: "600",
  color: "hsl(var(--ink-secondary))",
};
const proseShared = {
  h1: displayHeading,
  h2: displayHeading,
  h3: subHeading,
  h4: subHeading,
  a: proseLink,
  "a:hover": proseLinkHover,
  blockquote: {
    borderLeftColor: "hsl(var(--primary))",
    color: "hsl(var(--ink-secondary))",
    fontStyle: "normal",
  },
  pre: {
    backgroundColor: "hsl(var(--surface-recessed1))",
    color: "hsl(var(--ink-primary))",
    borderRadius: "var(--radius-md)",
  },
  "figcaption, .meta": { color: "hsl(var(--ink-comment))" },
  hr: { borderColor: "hsl(var(--border))" },
};

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    // Every one of these resolves to 0px (globals.css) — the scale is kept only
    // so the utility names stay stable. The names are slots, not sizes: nothing
    // in the system is rounded except genuinely circular elements. Do not
    // "restore" values here; radius 0 is the decision, and shape carrying no
    // information is what pushes hierarchy onto tone, spacing and type.
    borderRadius: {
      none: "0px",
      sm: "var(--radius-sm)", // 0px — buttons, pills, badges, inputs
      md: "var(--radius-md)", // 0px — code blocks
      lg: "var(--radius-lg)", // 0px — cards, popovers, dialogs
      full: "9999px", // circular only — never a rectangular fill
    },
    extend: {
      maxWidth: {
        // The reading column. Sized from the measure, not from a breakpoint:
        // 65 characters at the 19px body size, plus the 32px sm: gutters.
        // `max-w-screen-md` (768px) put the same copy at 72 characters per
        // line — past the top of the comfortable 45–75 range, and well past
        // the 60–66 optimum. Held at 700px through the Fraunces → Madefor
        // Text swap: measured from the shipped files the two faces' average
        // advances are within 1% (0.5175em vs 0.5218em over a–z plus space,
        // 0.4658 vs 0.4647 frequency-weighted), so the column carries over.
        // See DESIGN.md §Scale.
        measure: "700px",
        // The index column. Pages that are scanned rather than read — the home
        // page's two-column grid, in particular — have no measure to respect:
        // at 700px each column falls to ~300px and every post title wraps.
        index: "880px",
        // The lede column: the intro paragraph and the quick-search field.
        // Narrower than the index container on purpose, so the page opens
        // outward — lede, then the two-column grid — rather than zig-zagging.
        lede: "640px",
      },
      fontFamily: {
        // Chrome default: nav, buttons, labels. No web-font cost.
        sans: "var(--font-ui)",
        ui: "var(--font-ui)",
        heading: "var(--font-heading)",
        content: "var(--font-content)",
        mono: "var(--font-code)",
        // The wordmark only — never body, heading, or chrome. See DESIGN.md.
        wordmark: "var(--font-wordmark)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Elevation — addressable directly when a component needs a specific
        // step rather than a shadcn role.
        surface: {
          recessed2: "hsl(var(--surface-recessed2))",
          recessed1: "hsl(var(--surface-recessed1))",
          base: "hsl(var(--surface-base))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
        },

        // Ink — four tiers, split by job.
        ink: {
          primary: "hsl(var(--ink-primary))",
          secondary: "hsl(var(--ink-secondary))",
          comment: "hsl(var(--ink-comment))",
          faint: "hsl(var(--ink-faint))",
        },

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          container: "hsl(var(--primary-container))",
        },
        resting: {
          DEFAULT: "hsl(var(--resting))",
          container: "hsl(var(--resting-container))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        warning: "hsl(var(--warning))",
        success: "hsl(var(--success))",
        info: "hsl(var(--info))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        selection: "hsl(var(--selection))",
        "match-all": "hsl(var(--match-all))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        xxl: "32px",
      },
      transitionTimingFunction: {
        action: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      transitionDuration: {
        action: "130ms",
        resting: "400ms",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--ink-primary))",
            "--tw-prose-headings": "hsl(var(--ink-primary))",
            "--tw-prose-bold": "hsl(var(--ink-primary))",
            "--tw-prose-quotes": "hsl(var(--ink-secondary))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-quote-borders": "hsl(var(--primary))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--ink-comment))",
            "--tw-prose-code": "hsl(var(--ink-primary))",
            "--tw-prose-counters": "hsl(var(--ink-secondary))",
            "--tw-prose-bullets": "hsl(var(--ink-faint))",
            ...proseShared,
          },
        },
        // Same declarations, inverted CSS vars. The token layer already flips
        // per scheme, so both variants resolve identically.
        invert: {
          css: {
            "--tw-prose-invert-body": "hsl(var(--ink-primary))",
            "--tw-prose-invert-headings": "hsl(var(--ink-primary))",
            "--tw-prose-invert-bold": "hsl(var(--ink-primary))",
            "--tw-prose-invert-quotes": "hsl(var(--ink-secondary))",
            "--tw-prose-invert-links": "hsl(var(--primary))",
            "--tw-prose-invert-quote-borders": "hsl(var(--primary))",
            "--tw-prose-invert-hr": "hsl(var(--border))",
            "--tw-prose-invert-captions": "hsl(var(--ink-comment))",
            "--tw-prose-invert-code": "hsl(var(--ink-primary))",
            "--tw-prose-invert-counters": "hsl(var(--ink-secondary))",
            "--tw-prose-invert-bullets": "hsl(var(--ink-faint))",
            ...proseShared,
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
