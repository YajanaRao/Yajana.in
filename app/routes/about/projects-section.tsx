import { Link } from "react-router";
import { projects } from "./data";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

const featured = projects.slice(0, 3);

const ProjectsSection = () => {
  return (
    <Container>
      <section className="flex flex-col gap-10 py-16 lg:py-20">
        <div className="flex flex-col gap-2">
          <h2 className="m-0 font-heading text-4xl font-extrabold text-ink-primary lg:text-5xl">
            Projects
          </h2>
          <p className="m-0 font-content text-base text-ink-secondary">
            I have created and contributed to a few projects. Major ones are:
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          {featured.map((p) => (
            <article
              key={p.key}
              className="flex flex-col overflow-hidden bg-surface-recessed1"
            >
              <div className="aspect-[3/2] w-full shrink-0 overflow-hidden bg-surface-recessed2">
                <img
                  src={p.cover}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-sm p-xl">
                <h3 className="m-0 font-content text-2xl font-semibold leading-[1.3] text-ink-primary">
                  {p.title}
                </h3>
                <p className="m-0 flex-1 font-content text-base leading-[1.7] text-ink-secondary">
                  {p.description}
                </p>
                <div className="flex flex-wrap items-center gap-sm pt-2">
                  {p.source.map((s) => (
                    <a
                      key={s.key}
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className={buttonClassName({
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      {s.text}
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center pt-10">
          <Link
            prefetch="intent"
            to="/projects"
            className={buttonClassName({ variant: "secondary", size: "md" })}
          >
            View All Projects
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default ProjectsSection;
