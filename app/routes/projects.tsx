import { MetaFunction } from "react-router";
import { projects } from "./about/data";
import { WideProse } from "@/components/prose";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/kicker";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const meta: MetaFunction = () => {
  return [
    { title: "Projects — Yajana N Rao" },
    {
      name: "description",
      content:
        "All projects by Yajana N Rao — open source apps, libraries and tools across React Native, web and developer tooling.",
    },
  ];
};

type Project = (typeof projects)[number];

function ProjectMedia({ project }: { project: Project }) {
  if ("video" in project && project.video) {
    return (
      <div className="aspect-video w-full overflow-hidden bg-surface-recessed2">
        <iframe
          src={project.video}
          title={project.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }
  if ("cover" in project && project.cover) {
    return (
      <div className="aspect-[3/2] w-full overflow-hidden bg-surface-recessed2">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return null;
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const mediaRight = index % 2 === 1;
  return (
    <article
      className={cn(
        "flex flex-col gap-8 py-14 lg:flex-row lg:items-center lg:gap-14 lg:py-16",
        mediaRight && "lg:flex-row-reverse"
      )}
    >
      <div className="w-full shrink-0 lg:w-5/12">
        <ProjectMedia project={project} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-sm">
        <Kicker>{String(index + 1).padStart(2, "0")}</Kicker>
        <h2 className="m-0 font-content text-3xl font-semibold leading-[1.25] text-ink-primary">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="link link-quiet no-underline hover:underline"
          >
            {project.title}
          </a>
        </h2>
        <p className="m-0 font-content text-base leading-[1.7] text-ink-secondary">
          {project.description}
        </p>
        {project.tags?.length ? (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0 pt-1">
            {project.tags.map((tag) => (
              <li
                key={tag.key}
                className="m-0 bg-surface-raised px-2.5 py-1 font-ui text-xs text-ink-secondary"
              >
                {tag.text}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap items-center gap-sm pt-3">
          {project.source.map((s) => (
            <a
              key={s.key}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName({ variant: "secondary", size: "sm" })}
            >
              {s.text}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function RowDivider() {
  return <div className="h-px w-full bg-border" aria-hidden="true" />;
}

function Projects() {
  return (
    <WideProse>
      <Container>
        <section className="flex flex-col py-16 lg:py-20">
          <div className="flex flex-col gap-2 pb-6">
            <Kicker dot>Work</Kicker>
            <h1 className="m-0 font-heading text-4xl font-extrabold text-ink-primary lg:text-5xl">
              Projects
            </h1>
            <p className="m-0 font-content text-base text-ink-secondary">
              Everything I have built and shipped — open source apps, libraries
              and tools.
            </p>
          </div>

          {projects.map((project, index) => (
            <div key={project.key}>
              {index > 0 && <RowDivider />}
              <ProjectRow project={project} index={index} />
            </div>
          ))}
        </section>
      </Container>
    </WideProse>
  );
}

export default Projects;
