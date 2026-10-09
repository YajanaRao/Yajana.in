import { createCookie, type ActionFunctionArgs } from "react-router";

export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

export const themeCookie = createCookie("theme", {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365,
});

export async function themeAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme");
  if (!isTheme(theme)) {
    return new Response("Invalid theme", { status: 400 });
  }
  return new Response(JSON.stringify({ theme }), {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
      "Content-Type": "application/json",
    },
  });
}

// Inline in <head>: resolves "system" before first paint and follows OS changes.
export const systemThemeScript = `(function(){var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function a(){if(d.dataset.theme!=="system")return;d.classList.toggle("dark",m.matches);d.classList.toggle("light",!m.matches);}a();m.addEventListener("change",a);window.__applySystemTheme=a;})();`;
