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
    <div className="lg:w-1/2 p-1 not-prose">
      <div className="rounded-lg overflow-hidden bg-card">
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
            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
          </a>
          <p className="text-muted-foreground text-base">
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
                  <span className="text-muted-foreground ml-2">
                    {source.text}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProjectCard);
