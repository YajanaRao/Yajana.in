import { createCookie, type ActionFunctionArgs } from "react-router";

export const themeCookie = createCookie("theme", {
  sameSite: "lax",
  path: "/",
  httpOnly: true,
});

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
