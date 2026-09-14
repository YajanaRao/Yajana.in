import { LoaderFunctionArgs, MetaFunction } from "react-router";
import Hero from "./hero";
import ProjectsSection from "./projects-section";
import { ContactSection, Divider, NarrativeSection } from "./sections";
import { WideProse } from "@/components/prose";

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
    <WideProse>
      <Hero />
      <Divider />
      <NarrativeSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <ContactSection />
    </WideProse>
  );
}

export default About;
