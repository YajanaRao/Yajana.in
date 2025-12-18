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
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-quote-borders': '#059669',
            }
        }
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
