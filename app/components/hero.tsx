import { siteMetadata } from "../constants";

const Hero = () => {
  const { author, title: siteTitle } = siteMetadata;

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <img
        src="/profile-picture.jpg"
        alt={author.name}
        height={100}
        width={100}
        className="my-0 h-[100px] w-[100px] shrink-0 rounded-full object-cover"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="wordmark not-prose my-0 text-5xl leading-tight">
          {siteTitle}
        </h1>
        <p className="mb-0 mt-2 font-ui text-ink-secondary">{author.summary}</p>
      </div>
    </div>
  );
};

export default Hero;
