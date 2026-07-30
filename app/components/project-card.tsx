import * as React from "react";
import WebLink from "@/assets/svg/WebLink";
import Github from "@/assets/svg/Github";
import Npm from "@/assets/svg/Npm";
import Playstore from "@/assets/svg/Playstore";
import Appstore from "@/assets/svg/Appstore";

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
    <div className="p-2 lg:w-1/2 not-prose">
      <div className="overflow-hidden rounded-lg bg-card">
        {project.cover ? (
          <img
            className="mb-4 mt-0 h-64 w-full object-cover"
            src={project.cover}
            alt={project.title}
          />
        ) : (
          <iframe
            className="mb-4 w-full"
            height="260"
            src={project.video}
            title={`${project.title} — demo video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
        <div className="px-6 pb-6">
          <a target="_blank" href={project.link} className="no-underline">
            <h3 className="mb-2 mt-0 font-heading text-xl font-extrabold italic text-ink-primary">
              {project.title}
            </h3>
          </a>
          <p className="mb-4 text-base text-ink-secondary">
            {project.description}
          </p>
          {/* `.length &&` would render a literal 0 for an empty source list. */}
          {project.source?.length ? (
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              {project.source.map((source) => (
                <a
                  key={`${project.key}-${source.key}`}
                  className="group flex h-8 items-center gap-2 no-underline"
                  target="_blank"
                  href={source.link}
                >
                  {renderSourceIcon(source.type)}
                  <span className="font-ui text-sm text-ink-secondary transition-colors duration-action ease-action group-hover:text-primary">
                    {source.text}
                  </span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
