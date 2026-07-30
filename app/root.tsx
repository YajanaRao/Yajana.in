import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
  LinksFunction,
  LoaderFunctionArgs,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
// tokens.css is generated from design.md's front matter (`bun run tokens`) and
// holds every axis value. globals.css maps them onto shadcn roles. Values are
// generated, role mapping is authored — so a hex can't drift between the two.
import "../styles/tokens.css";
import "../styles/globals.css";
import SiteLayout from "@/components/layout";
import { themeCookie, themeAction } from "@/lib/theme";
import { ErrorBoundary } from "@/components/error-boundary";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      // Fraunces carries headings and long-form body (variable, so
      // font-optical-sizing sizes it per use); JetBrains Mono carries code;
      // Freehand carries the wordmark alone — the one handmade mark.
      // Chrome uses the system-UI stack, so it needs no web font at all.
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Freehand&family=JetBrains+Mono:wght@400..700&display=swap",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieString = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieString);
  return theme || "light";
}

export const action = themeAction;

/**
 * The document shell. React Router renders this around BOTH the app and the
 * ErrorBoundary, which is the point: without it an error escaping the loader
 * renders bare markup with no <body> background, so the error page appeared as
 * black-on-white instead of picking up the theme.
 *
 * The theme class must stay on <html> — the token layer's var() aliases resolve
 * against whichever element carries it (see globals.css).
 */
export function Layout({ children }: { children: React.ReactNode }) {
  // Not useLoaderData: on an error the root loader's data may be absent, and
  // this component still has to render.
  const theme = (useRouteLoaderData("root") as string | undefined) ?? "light";

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://yajana.in" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#2D353B" : "#FDF6E3"}
        />
        <link rel="apple-touch-icon" href="/profile-picture.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <SpeedInsights />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export { ErrorBoundary };

export default function App() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
