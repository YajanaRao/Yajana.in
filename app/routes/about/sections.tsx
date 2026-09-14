import { Kicker } from "@/components/ui/kicker";
import { Container } from "@/components/ui/container";
import { siteMetadata } from "../../constants";
import { NarrativeIllustration } from "./narrative-illustration";


const { social } = siteMetadata;

export function externalAttrs(href: string) {
  return href.startsWith("http")
    ? { target: "_blank" as const, rel: "noreferrer" }
    : {};
}

export const CONTACT_LINKS = [
  { label: "Email", href: "mailto:yajananrao@gmail.com" },
  { label: "X / Twitter", href: `https://twitter.com/${social.twitter}` },
  { label: "GitHub", href: `https://github.com/${social.github}` },
  { label: "LinkedIn", href: `https://www.linkedin.com/in/${social.linkedin}` },
] as const;

export function Divider() {
  return (
    <Container>
      <div className="h-px w-full bg-border" aria-hidden="true" />
    </Container>
  );
}

function MapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-3.5 shrink-0 text-primary"
    >
      <path
        d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="2.4"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function LocationRow() {
  return (
    <div className="flex items-center gap-2 font-content text-sm font-normal text-ink-comment">
      <MapPin />
      <span>Sagar, Karnataka, India</span>
    </div>
  );
}

export function NarrativeSection() {
  const years = new Date().getFullYear() - 2021;
  return (
    <Container>
      <section className="flex flex-col gap-8 py-16 lg:flex-row lg:gap-16 lg:py-20">
        <div className="flex  shrink-0 flex-col gap-3 items-center lg:items-start">
          <h2 className="m-0 font-heading text-[32px] font-extrabold leading-none tracking-[-0.03em] text-ink-primary">
            How I got here
          </h2>
          <div className="h-0.5 w-8 bg-primary" aria-hidden="true" />
          <NarrativeIllustration />
        </div>
        <div className="flex max-w-[720px] flex-col gap-6 font-content text-[19px] leading-[1.65] text-ink-primary">
          <p className="m-0">
            I am a Software Engineer based in Sagara, Karnataka, India. I am
            proficient in Full-Stack web and mobile development. I love to build
            products that can make a difference &mdash; I have worked on various
            projects and have experience building scalable, performant
            applications.
          </p>
          <p className="m-0">
            My aspiration is to bring wellbeing into people&apos;s lives through
            technology and other means. I completed my B.Sc in Electronics and
            Communication, and have been converting ideas into software for
            almost {years} years &mdash; currently at{" "}
            <a
              href="https://interactlabs.ai"
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              Interact Labs
            </a>
            .
          </p>
          <p className="m-0">
            I created this website to document my journey as I learn new things
            and share them with you. When I&apos;m not writing code or working
            on a blog post, I&apos;m probably spending time outside, reading, or
            thinking about the quieter things in life.
          </p>
        </div>
      </section>
    </Container>
  );
}

export function ContactSection() {
  return (
    <Container>
      <section className="flex flex-col py-16 lg:py-20">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex max-w-[560px] flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Kicker dot>LET&apos;S CONNECT</Kicker>
              <h2 className="m-0 font-heading text-5xl font-extrabold text-ink-primary">
                Let&apos;s talk.
              </h2>
            </div>
            <p className="lede m-0">
              If you have any questions or are looking forward to collaborating,
              feel free to reach out. I&apos;m always open to interesting
              conversations.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-1">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="link"
                  {...externalAttrs(link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <figure className="m-0 flex w-full max-w-[440px] flex-col gap-4 bg-surface-recessed1 p-8">
            <span
              className="font-content text-[56px] leading-[0.8] text-primary opacity-40"
              aria-hidden="true"
            >
              &ldquo;
            </span>
            <blockquote className="m-0 border-0 p-0 font-content text-[22px] font-normal leading-normal text-ink-primary">
              My aspiration is to bring wellbeing into people&apos;s lives
              through Technology and other means.
            </blockquote>
            <figcaption className="font-ui text-[13px] text-ink-comment">
              &mdash; Yajana Rao
            </figcaption>
          </figure>
        </div>
      </section>
    </Container>
  );
}
