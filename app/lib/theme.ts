import { createCookie } from "react-router";

export const themeCookie = createCookie("theme", {
  sameSite: "lax",
  // secure: process.env.NODE_ENV === "production",
  path: "/",
  httpOnly: true,
});
