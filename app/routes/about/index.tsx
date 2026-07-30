import { LoaderFunctionArgs, MetaFunction } from "react-router";
import { themeAction } from "@/lib/theme";
import Hero from "./hero";
import Biography from "./biography";
import ProjectsSection from "./projects-section";
import Contact from "./contact";

// The overlay header renders the theme toggle inside this route, so its
// no-action fetcher.Form posts here — expose the shared theme action.
export const action = themeAction;

export const meta: MetaFunction<typeof loader> = (args) => {
  let { siteUrl } = args.data || {};
  return [
    {
      title: "About — Yajana N Rao",
    },
    {
      content:
        "About Yajana N Rao — software engineer, and the projects, writing and ideas behind this site.",
      name: "description",
    },
    {
      content: `${siteUrl}/profile-picture.jpg`,
      property: "image",
    },
    {
      content: "Yajana's Blog",
      property: "og:title",
    },
    {
      content: "Yajana Rao's blog on Programming, Spirituality and Books",
      name: "og:description",
    },
    {
      content: `${siteUrl}/profile-picture.jpg`,
      property: "og:image",
    },
    {
      content: "300",
      property: "og:image:width",
    },
    {
      content: "300",
      property: "og:image:height",
    },
    {
      content: "image/jpeg",
      property: "og:image:type",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;
  return { siteUrl };
};

function About() {
  return (
    <>
      <Hero />
      <Biography />
      <ProjectsSection />
      <Contact />
    </>
  );
}

export default About;
