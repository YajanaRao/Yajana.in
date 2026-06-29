import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {  
  darkMode: 'class',
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      "Fira Sans": ["Fira Sans", "sans-serif"],
      "Montserrat": ["Montserrat", "sans-serif"],
      "freehand": ["Freehand", "cursive"],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
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
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-quotes': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--primary))',
            '--tw-prose-quote-borders': 'hsl(var(--primary))',
            h3: { color: 'hsl(var(--muted-foreground))' },
            h4: { color: 'hsl(var(--muted-foreground))' },
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: 'hsl(var(--primary) / 0.45)',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              transition:
                'text-decoration-thickness .2s ease, text-decoration-color .2s ease',
            },
            'a:hover': {
              textDecorationColor: 'hsl(var(--primary))',
              textDecorationThickness: '2px',
            },
          }
        },
        invert: {
          css: {
            '--tw-prose-invert-body': 'hsl(var(--foreground))',
            '--tw-prose-invert-headings': 'hsl(var(--foreground))',
            '--tw-prose-invert-bold': 'hsl(var(--foreground))',
            '--tw-prose-invert-quotes': 'hsl(var(--foreground))',
            '--tw-prose-invert-links': 'hsl(var(--primary))',
            '--tw-prose-invert-quote-borders': 'hsl(var(--primary))',
            h3: { color: 'hsl(var(--muted-foreground))' },
            h4: { color: 'hsl(var(--muted-foreground))' },
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: 'hsl(var(--primary) / 0.45)',
              textDecorationThickness: '1px',
              textUnderlineOffset: '3px',
              transition:
                'text-decoration-thickness .2s ease, text-decoration-color .2s ease',
            },
            'a:hover': {
              textDecorationColor: 'hsl(var(--primary))',
              textDecorationThickness: '2px',
            },
          }
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
