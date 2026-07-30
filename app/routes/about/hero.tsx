import { Link, useLocation } from "react-router";
import { cn } from "@/lib/cn";
import { AnnotatedLink, Highlight, Underline } from "@/components/annotate";
import Switch from "@/components/switch";
import { NAV_ITEMS } from "@/components/header";
import { siteMetadata } from "../../constants";
import { SocialRow } from "./social-links";
import heroPhoto from "./hero.jpg";

const wonk = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const scrim =
  "bg-[linear-gradient(180deg,hsl(var(--surface-base)/0.92)_0%,hsl(var(--surface-base)/0.55)_45%,hsl(var(--surface-base)/0.12)_78%,transparent_100%)] " +
  "lg:bg-[linear-gradient(90deg,hsl(var(--surface-base)/0.97)_0%,hsl(var(--surface-base)/0.82)_26%,hsl(var(--surface-base)/0.4)_48%,transparent_72%)]";

function MapPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-4 shrink-0 text-primary"
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

function OverlayHeader() {
  const { pathname } = useLocation();
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,hsl(var(--surface-base)/0.9)_0%,hsl(var(--surface-base)/0.4)_60%,transparent_100%)]" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-20 lg:py-5">
        <Link
          prefetch="intent"
          to="/"
          className="wordmark text-3xl leading-none no-underline lg:text-4xl"
        >
          {siteMetadata.title}
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-4 sm:gap-6 lg:gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);
            const link = (
              <Link
                key={item.to}
                prefetch="intent"
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-ui no-underline transition-colors duration-action ease-action",
                  active
                    ? "font-semibold text-primary"
                    : "text-ink-secondary hover:text-ink-primary"
                )}
              >
                {item.label}
              </Link>
            );
            return active ? <Underline key={item.to}>{link}</Underline> : link;
          })}
          <Switch />
        </nav>
      </div>
    </header>
  );
}

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[560px] flex-col overflow-hidden lg:min-h-[720px]">
      {/* The photo is pre-composed with the subject in the right third and the
          left half empty sky/sea. On desktop a centered cover keeps the person
          clear of the text (which sits over the empty half); on the narrow
          mobile frame the sides crop hard, so anchor right to keep the person in
          view rather than the backpack. */}
      <img
        src={heroPhoto}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[82%_center] lg:object-center"
      />
      <div className={cn("absolute inset-0 -z-10", scrim)} />

      <OverlayHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-32 lg:px-20 lg:pt-40">
        <div className="flex max-w-[680px] flex-col gap-6 lg:gap-8">
          <p className="kicker m-0 flex items-center gap-2 text-[11px]">
            <span
              className="inline-block size-1.5 shrink-0 bg-primary"
              aria-hidden="true"
            />
            <span className="sm:hidden">
              SOFTWARE ENGINEER + SEEKER OF TRUTH
            </span>
            <span className="hidden sm:inline">
              SOFTWARE ENGINEER + WRITER + SEEKER OF TRUTH
            </span>
          </p>

          <h1 className="m-0 flex flex-col font-heading text-5xl font-light not-italic leading-[1.05] text-ink-primary sm:text-7xl lg:text-8xl">
            <span style={wonk}>Hello,</span>
            <span style={wonk}>I&apos;m Yajana Rao.</span>
          </h1>

          <p
            className="m-0 max-w-xl font-content text-lg leading-relaxed text-ink-primary lg:text-xl"
            style={wonk}
          >
            My aspiration is to bring <Highlight>wellbeing</Highlight> into
            people&apos;s lives through Technology and other means.
          </p>

          <div className="flex items-center gap-2.5 font-content text-lg text-ink-primary">
            <MapPin />
            <span style={wonk}>
              <AnnotatedLink href="https://maps.app.goo.gl/nbyDvrEhSXjcjFSL9">
                Sagar
              </AnnotatedLink>
              , Karnataka, India
            </span>
          </div>

          <SocialRow />
        </div>
      </div>
    </section>
  );
};

export default Hero;
