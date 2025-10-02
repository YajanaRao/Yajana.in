import * as React from "react";
import { LoaderFunctionArgs, MetaFunction } from "react-router";
import { projects, skills } from "./data";
import WebLink from "@/assets/svg/WebLink";
import Github from "@/assets/svg/Github";
import Npm from "@/assets/svg/Npm";
import Playstore from "@/assets/svg/Playstore";
import Appstore from "@/assets/svg/Appstore";
import ProfilePic from "@/assets/images/profile-pic.jpg";
import FollowMe from "@/components/follow-me";

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
      content: `${siteUrl}/logo.jpg`,
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
      content: `${siteUrl}/logo.jpg`,
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

function SkillExplorer() {
  const [skill, setSkill] = React.useState("");
  function getSkills(skill: string) {
    if (skill === "") return skills.map((item) => item.value).flat();
    return skills.find((item) => item.key === skill)?.value;
  }

  const lists = React.useMemo(() => getSkills(skill), [skill]);
  return (
    <div className="flex not-prose">
      <ul className="flex-none pr-4 list-none">
        {skills.map((item) => (
          <li
            key={item.key}
            onClick={() => setSkill(item.key)}
            onMouseEnter={() => setSkill(item.key)}
            onMouseLeave={() => setSkill("")}
            className={
              skill === item.key
                ? "cursor-default px-2 py-1 bg-[#ecc94b] mb-2 text-gray-800 rounded"
                : "cursor-pointer px-2 py-1 bg-white mb-2 text-gray-800 rounded"
            }
          >
            <h5>{item.text}</h5>
          </li>
        ))}
      </ul>
      <div
        className="flex-auto bg-white p-2 overflow-y-auto overflow-x-hidden rounded"
        style={{ height: "515px" }}
      >
        <ul className="list-none grid sm:grid-cols-3  md:grid-cols-6 gap-2">
          {lists.map((s) => (
            <li
              key={s.text}
              className="py-1 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => window.open(s.link, "_blank")}
            >
              <img
                className="h-10 w-10 rounded text-center"
                alt={s.text}
                src={s.image}
              />
              <p className="text-xs mt-1 text-center text-gray-800">{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Project = {
  key: string;
  title: string;
  description: string;
  cover?: string;
  video?: string;
  link: string;
  tags: { key: string }[];
  source: { key: string; type: string; link: string; text: string }[];
};

const ProjectCard = ({ project }: { project: Project }) => {
  const renderSourceIcon = (source: string) => {
    if (source === "web") return <WebLink />;
    if (source === "github") return <Github />;
    if (source === "npm") return <Npm />;
    if (source === "playstore") return <Playstore />;
    if (source === "appstore") return <Appstore />;
  };
  return (
    <div className="lg:w-1/2 p-1">
      <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-[#1e1e1e]">
        {project.cover ? (
          <img
            className="w-full h-64 mt-0 mb-4"
            src={project.cover}
            alt={project.title}
          />
        ) : (
          <iframe
            className="w-full mb-4"
            height="260"
            src={project.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        <div className="px-6">
          <a target="_blank" href={project.link}>
            <div className="font-bold text-xl mb-2">{project.title}</div>
          </a>
          <p className="text-gray-700 dark:text-white text-base">
            {project.description}
          </p>
          {project?.source?.length && (
            <div className="flex flex-col md:flex-row mb-4">
              {project.source.map((source) => (
                <a
                  key={`${project.key}-${source.key}`}
                  className="group flex items-center mr-4 h-8"
                  target="_blank"
                  href={source.link}
                >
                  {renderSourceIcon(source.type)}
                  <span className="text-zinc-600 dark:text-zinc-400 ml-2">
                    {source.text}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="px-6 pb-2">
          {project.tags.map((tag) => (
            <span
              key={`${project.key}-${tag.key}`}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag.key}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;
  return { siteUrl };
};

function About() {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              alt="Profile Picture"
              loading="lazy"
              width="800"
              height="800"
              decoding="async"
              data-nimg="1"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              sizes="(min-width: 1024px) 32rem, 20rem"
              src={ProfilePic}
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
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
      <h2>Skills</h2>
      <p>
        I have experience working with the following technologies and tools:
      </p>
      <p>
        I keep a <a href="/uses"> uses</a> page updated with the stuff I use.
      </p>
      <SkillExplorer />

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
    </>
  );
}

export default About;
