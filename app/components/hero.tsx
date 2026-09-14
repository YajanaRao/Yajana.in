import { siteMetadata } from "../constants";

const Hero = () => {
  const { author, title: siteTitle } = siteMetadata;

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 px-6 not-prose sm:flex-row sm:gap-8 sm:px-8">
      <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-full">
        <img
          src="/profile-picture.jpg"
          alt={author.name}
          height={512}
          width={512}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="wordmark text-5xl leading-tight">{siteTitle}</h1>
        <p className="font-ui text-base text-ink-secondary">{author.tagline}</p>
      </div>
    </div>
  );
};

export default Hero;
