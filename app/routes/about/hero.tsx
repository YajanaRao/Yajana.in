import { Highlight } from "@/components/annotate";
import { Link } from "react-router";
import { Kicker } from "@/components/ui/kicker";
import { Container } from "@/components/ui/container";
import { LocationRow } from "./sections";
import { SocialRow } from "./social-links";
import brushPortrait from "@/assets/images/about/brush-portrait.webp";
import { ILLUSTRATION_TONE } from "./illustration-tone";

function BrushPortrait() {
  return (
    <div className="relative aspect-[464/431] w-full max-w-[416px]">
      <div
        className={`absolute bottom-4 inset-y-0 left-[17%] w-[75%] ${ILLUSTRATION_TONE.bg}`}
        aria-hidden="true"
      />
      <img
        src={brushPortrait}
        alt="Painted portrait of Yajana Rao"
        className="absolute inset-x-0 bottom-0 h-[92%] w-full object-cover object-top"
      />
    </div>
  );
}

const Hero = () => {
  return (
    <Container>
      <section className="not-prose flex flex-col gap-16 pb-16 pt-10 lg:flex-row justify-between lg:items-end lg:gap-20 lg:pb-24 lg:pt-16">
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Kicker>
              SOFTWARE ENGINEER &middot; WRITER &middot; SEEKER OF TRUTH
            </Kicker>
            <h1 className="m-0 font-heading text-4xl font-extrabold leading-none text-ink-primary sm:text-5xl">
              Hello, I&apos;m <span className="mr-4" />
              <Highlight className="whitespace-nowrap">Yajana Rao</Highlight>
            </h1>
          </div>
          <p className="m-0 font-content text-[19px] font-normal leading-[1.65] text-ink-primary">
            I&apos;m a software engineer, seeker and a writer from India. I
            write about
            <Link to="/blog?q=tech" className="link ml-1">
              programming,
            </Link>
            <Link to="/blog?q=finance" className="link ml-1">
              money
            </Link>
            , and the search for
            <Link to="/blog?q=meditation" className="link ml-1">
              a quieter mind
            </Link>
            .
          </p>
          <div className="flex flex-col gap-3.5 pt-2">
            <LocationRow />
            <SocialRow />
          </div>
        </div>
        <div className="w-full max-w-[416px] shrink-0 lg:w-[416px]">
          <BrushPortrait />
        </div>
      </section>
    </Container>
  );
};

export default Hero;
