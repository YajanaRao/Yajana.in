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
import "../styles/tokens.css";
import "../styles/globals.css";

import "@fontsource-variable/big-shoulders-display/wght";
import "@fontsource-variable/ibm-plex-sans/wght.css";
import "@fontsource-variable/ibm-plex-sans/wght-italic.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import "@fontsource/freehand/latin-400.css";

import plexSans from "@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2?url";
import bigShouldersDisplay from "@fontsource-variable/big-shoulders-display/files/big-shoulders-display-latin-wght-normal.woff2?url";
import freehandRegular from "@fontsource/freehand/files/freehand-latin-400-normal.woff2?url";
import SiteLayout from "@/components/layout";
import { themeCookie, themeAction } from "@/lib/theme";
import { ErrorBoundary } from "@/components/error-boundary";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: plexSans,
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: bigShouldersDisplay,
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: freehandRegular,
      crossOrigin: "anonymous",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieString = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieString);
  return theme || "light";
}

export const action = themeAction;

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = (useRouteLoaderData("root") as string | undefined) ?? "light";

  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://yajana.in" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta
          name="theme-color"
          content={theme === "dark" ? "#13181D" : "#FDF6E3"}
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
