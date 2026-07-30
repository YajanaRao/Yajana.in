import { createCookie, type ActionFunctionArgs } from "react-router";

export const themeCookie = createCookie("theme", {
  sameSite: "lax",
  // secure: process.env.NODE_ENV === "production",
  path: "/",
  httpOnly: true,
});

/**
 * Persist the chosen theme to the cookie. A `fetcher.Form` with no `action`
 * posts to its contextual route, so any route that renders the theme toggle
 * (Switch) outside the root's tree — e.g. the About page's overlay header —
 * must expose this as its own `action`, or the POST 405s.
 */
export async function themeAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme") as string;
  return new Response(JSON.stringify({ theme }), {
    headers: {
      "Set-Cookie": await themeCookie.serialize(theme),
      "Content-Type": "application/json",
    },
  });
}
