import * as React from "react";
import { LoaderFunctionArgs, MetaFunction } from "react-router";
import { projects } from "./data";
import FollowMe from "@/components/follow-me";
import ProfileCarousel from "@/components/profile-carousel";
import ProjectCard from "@/components/project-card";

export const meta: MetaFunction<typeof loader> = (args) => {
  let { siteUrl } = args.data || {};
  return [
    {
      title: "Yajana's Blog",
    },
    {
      content: "Yajana Rao's blog on Programming, Spirituality and Books",
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
    <div className="pt-6">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-8">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 mx-auto lg:mx-0 lg:max-w-none">
            <ProfileCarousel />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-light font-freehand tracking-tight text-zinc-800 mb-0 sm:text-5xl dark:text-zinc-100">
            Hello,
          </h1>
          <p>I'm Yajana Rao.</p>
          <p>
            My aspiration is to bring wellbeing into people lives through
            Technology and other means. I currently live in{" "}
            <a href="https://maps.app.goo.gl/nbyDvrEhSXjcjFSL9" target="_blank">
              Sagar
            </a>
            , Karnataka, India 🇮🇳 .
          </p>
          <p>
            I am a Software engineer, I have been working on converting ideas
            into software application for almost{" "}
            {new Date().getFullYear() - 2021} + years. I am currently working at{" "}
            <a href="https://humanisys.ai" target="_blank">
              Humanisys Labs
            </a>
            . I have completed B. Sc in Electronics and Communication.
          </p>

          <p>
            I created this website as a place to document my journey as I learn
            new things and share them with you.
          </p>
        </div>
        <div className="lg:pl-20">
          <FollowMe />
        </div>
      </div>
      <h2>About me</h2>
      <p>
        I keep a <a href="/uses"> uses</a> page updated with the stuff I use.
      </p>

      <p>
        When I am not writing code or working on a blog post, I'm probably
        spending my time either
        <a
          target="_blank"
          className="mx-1"
          href="https://www.goodreads.com/yajanarao
"
        >
          reading
        </a>
        , listening to
        <a
          target="_blank"
          className="mx-1"
          href="https://open.spotify.com/user/31px6qslueb43ihrv6xa63oggaay?si=9039784e728c4094"
        >
          music
        </a>
        or meditating.
      </p>
      <p>
        See my <a href="/now">now</a> page for what I am doing now.
      </p>

      <h2>Projects</h2>
      <p>I have created and contributed to few projects. Major ones are</p>

      <div className="flex flex-wrap">
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>

      <h2>Elsewhere on the web</h2>
      <p>
        I share interesting quotes/ passages in my whatsapp channel
        <a
          href="https://whatsapp.com/channel/0029VaAbdNgJ93wSWi9YAi3X"
          target="_blank"
          className="mx-2"
        >
          Seeking Truth
        </a>
      </p>
      <h2> 👋 Let's talk </h2>
      <p>
        Feel free to contact if you have any questions or if you are looking
        forward to collaborate. Here are two most efficient ways to reach me:
      </p>
      <ul className="m-8">
        <li>
          ✉️ <a href="mailto: yajananrao@gmail.com"> yajananrao@gmail.com</a>
        </li>
        <li>
          🐦 <a href="https://twitter.com/yajanarao"> twitter/@YajanaRao</a>
        </li>
      </ul>
    </div>
  );
}

export default About;
