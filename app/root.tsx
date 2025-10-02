import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "react-router";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Layout from "@/components/layout";
import { themeCookie } from "@/lib/theme";

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
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap",
    },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieString = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieString);
  return theme || "light";
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme") as string;
  return new Response(JSON.stringify({ theme }), {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
      "Content-Type": "application/json",
    },
  });
}

export default function App() {
  const theme = useLoaderData<string>();
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:url" content="https://yajana.in" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}
