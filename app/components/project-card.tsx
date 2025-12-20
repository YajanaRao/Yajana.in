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

export default React.memo(ProjectCard);
