import { AnnotatedLink } from "@/components/annotate";
import { projects } from "./data";

const wonk = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const byKey = Object.fromEntries(projects.map((p) => [p.key, p]));

// A curated view of the projects for the About page — the copy is tightened for
// the editorial layout, and the cover image reuses what's already in the
// projects data (per the design). Only the three shown here count toward "03";
// `browser-recorder` (video, no cover) is intentionally left out.
const featured = {
  label: "FEATURED UTILITY",
  title: "Serenity Music Player",
  blurb:
    "Open source music player with 355+ GitHub stars. Built using React Native as an alternative to Spotify. Supports local, network, and cloud audio sources.",
  action: "View Source on GitHub",
  href: byKey.serenity.link,
  cover: byKey.serenity.cover,
  icon: "arrow" as const,
};

const cards = [
  {
    label: "AUDIO PLATFORM",
    title: "ShortMic",
    blurb:
      "Audio-first social media platform with 1000+ downloads and 4.6 rating on Play Store. Users can share thoughts and stories in audio format.",
    action: "Read Case Study",
    href: byKey.shortmic.link,
    icon: "external" as const,
  },
  {
    label: "OPEN SOURCE LIBRARY",
    title: "React Track Player",
    blurb:
      "A React Native library to play audio from local and network sources. An alternative to react-native-track-player with a simple, easy-to-use API.",
    action: "View on GitHub",
    href: "https://github.com/YajanaRao/react-track-player",
    icon: "arrow" as const,
  },
];

function ActionIcon({ kind }: { kind: "arrow" | "external" }) {
  if (kind === "external") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-primary">
        <path d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0 text-primary">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cardLabel = "font-ui text-xs font-bold uppercase tracking-[0.06em] text-resting";

const ProjectsSection = () => {
  return (
    <>
      <div className="h-0.5 w-full bg-border" aria-hidden="true" />
      <section className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-16 lg:gap-16 lg:px-20 lg:py-32">
          {/* Header */}
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <p className="kicker m-0 flex items-center gap-2 text-[11px]">
                <span className="inline-block size-1.5 shrink-0 bg-primary" aria-hidden="true" />
                PROJECTS
              </p>
              <h2 className="m-0 font-heading text-4xl font-semibold not-italic text-ink-primary lg:text-6xl" style={wonk}>
                Projects
              </h2>
              <p className="m-0 font-content text-lg text-ink-comment" style={wonk}>
                I have created and contributed to a few projects. Major ones are:
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="font-heading text-5xl font-light not-italic leading-none text-ink-faint" style={wonk}>
                03
              </span>
              <span className="font-ui text-xs font-bold uppercase tracking-[0.06em] text-ink-comment">
                Open source systems shipped
              </span>
            </div>
          </div>

          {/* Layout */}
          <div className="flex flex-col gap-10">
            {/* Featured — image on top (mobile) / right (desktop) */}
            <article className="flex flex-col-reverse border-2 border-border bg-primary-container lg:flex-row">
              <div className="flex flex-col gap-8 p-8 lg:w-[58%] lg:p-14">
                <p className={cardLabel}>{featured.label}</p>
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 font-heading text-3xl font-semibold not-italic text-ink-primary lg:text-4xl" style={wonk}>
                    {featured.title}
                  </h3>
                  <p className="m-0 font-content text-lg leading-relaxed text-ink-secondary" style={wonk}>
                    {featured.blurb}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <AnnotatedLink href={featured.href}>{featured.action}</AnnotatedLink>
                  <ActionIcon kind={featured.icon} />
                </div>
              </div>
              <div className="lg:w-[42%]">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="h-56 w-full object-cover lg:h-full"
                />
              </div>
            </article>

            {/* Two text cards */}
            <div className="flex flex-col gap-10 lg:flex-row">
              {cards.map((c) => (
                <article
                  key={c.title}
                  className="flex flex-1 flex-col gap-6 border border-border bg-surface-recessed1 p-6 lg:p-10"
                >
                  <p className={cardLabel}>{c.label}</p>
                  <h3 className="m-0 font-heading text-2xl font-semibold not-italic text-ink-primary" style={wonk}>
                    {c.title}
                  </h3>
                  <p className="m-0 flex-1 font-content text-base leading-relaxed text-ink-secondary" style={wonk}>
                    {c.blurb}
                  </p>
                  <div className="flex items-center gap-2">
                    <AnnotatedLink href={c.href}>{c.action}</AnnotatedLink>
                    <ActionIcon kind={c.icon} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
