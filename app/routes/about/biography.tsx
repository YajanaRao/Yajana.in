import { AnnotatedLink } from "@/components/annotate";
import portraitPhoto from "./portrait.jpg";

const wonk = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const Biography = () => {
  const years = new Date().getFullYear() - 2021;

  return (
    <section className="bg-surface-recessed1">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 lg:flex-row lg:items-start lg:gap-16 lg:px-20 lg:py-32">
        {/* Left: kicker + heading + portrait */}
        <div className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
          <p className="kicker m-0 flex items-center gap-2 text-[11px]">
            <span
              className="inline-block size-1.5 shrink-0 bg-primary"
              aria-hidden="true"
            />
            BIOGRAPHY
          </p>
          <h2
            className="m-0 font-heading text-4xl font-semibold not-italic text-ink-primary lg:text-5xl"
            style={wonk}
          >
            About me
          </h2>
          <img
            src={portraitPhoto}
            alt="Yajana Rao"
            className="h-80 w-full border-2 border-border object-cover object-top lg:h-[400px]"
          />
        </div>

        {/* Right: body copy with drawn-underline links */}
        <div className="flex flex-1 flex-col gap-6 font-content text-[19px] leading-[1.7] text-ink-primary">
          <p className="m-0" style={wonk}>
            I am a Software engineer, I have been working on converting ideas
            into software applications for almost {years}+ years. I am currently
            working at{" "}
            <AnnotatedLink href="https://interactlabs.ai">
              Interact Labs
            </AnnotatedLink>
            . I have completed B.Sc in Electronics and Communication.
          </p>
          <p className="m-0" style={wonk}>
            I created this website as a place to document my journey as I learn
            new things and share them with you.
          </p>
          <p className="m-0" style={wonk}>
            I keep a <AnnotatedLink href="/uses">uses</AnnotatedLink> page
            updated with the stuff I use.
          </p>
          <p className="m-0" style={wonk}>
            When I am not writing code or working on a blog post, I&apos;m
            probably spending my time either{" "}
            <AnnotatedLink href="https://www.goodreads.com/yajanarao">
              reading
            </AnnotatedLink>
            ,{" "}
            <AnnotatedLink href="https://open.spotify.com/user/31px6qslueb43ihrv6xa63oggaay?si=9039784e728c4094">
              music
            </AnnotatedLink>{" "}
            or meditating.
          </p>
          <p className="m-0" style={wonk}>
            See my <AnnotatedLink href="/now">now page</AnnotatedLink> for what I
            am doing now.
          </p>
          <p className="m-0" style={wonk}>
            I also write on my <AnnotatedLink href="/">blog</AnnotatedLink>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Biography;
