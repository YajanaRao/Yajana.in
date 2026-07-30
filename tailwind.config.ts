import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const proseLink = {
  fontWeight: "500",
  textDecoration: "underline",
  textDecorationColor: "hsl(var(--primary) / 0.45)",
  textDecorationThickness: "1px",
  textUnderlineOffset: "3px",
  transition:
    "text-decoration-thickness 130ms cubic-bezier(0.2, 0.8, 0.2, 1), text-decoration-color 130ms cubic-bezier(0.2, 0.8, 0.2, 1)",
};

const proseLinkHover = {
  textDecorationColor: "hsl(var(--primary))",
  textDecorationThickness: "2px",
};

const proseShared = {
  h1: { fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: "800" },
  h2: { fontFamily: "var(--font-heading)", fontStyle: "italic", fontWeight: "800" },
  h3: {
    fontFamily: "var(--font-heading)",
    fontStyle: "italic",
    fontWeight: "800",
    color: "hsl(var(--ink-secondary))",
  },
  h4: {
    fontFamily: "var(--font-heading)",
    fontStyle: "italic",
    fontWeight: "800",
    color: "hsl(var(--ink-secondary))",
  },
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
    borderRadius: {
      none: "0px",
      sm: "var(--radius-sm)", //  3px — buttons, pills, badges, inputs
      md: "var(--radius-md)", //  6px — code blocks
      lg: "var(--radius-lg)", // 10px — cards, popovers, dialogs
      full: "9999px", // circular only — never a rectangular fill
    },
    extend: {
      fontFamily: {
        // Chrome default: nav, buttons, labels. No web-font cost.
        sans: "var(--font-ui)",
        ui: "var(--font-ui)",
        heading: "var(--font-heading)",
        content: "var(--font-content)",
        mono: "var(--font-code)",
        // The wordmark only — never body, heading, or chrome. See DESIGN.md.
        freehand: "var(--font-wordmark)",
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
      // DESIGN.md spacing scale (§Layout). The named steps are the design
      // vocabulary — `gap-md`, `p-xl` read as intent, not magnitude — and every
      // value is a multiple of the 8px base (xs=4 is the one half-step). This is
      // additive: Tailwind's numeric scale still resolves, so existing even-step
      // classes (p-4, gap-2) keep working; new work should prefer the named tokens.
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
