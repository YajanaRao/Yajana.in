import * as React from "react";
import { Link } from "react-router";
import { siteMetadata } from "../constants";

type HeroProps = {
  titleSlot?: React.ReactNode;
};

const Hero = ({ titleSlot }: HeroProps) => {
  const { author, title: siteTitle } = siteMetadata;

  return (
    <div className="flex flex-col sm:flex-row mt-10 items-center justify-center">
      <div className="justify-center items-center flex">
        <img
          src="/profile-picture.jpg"
          alt={author.name}
          height={100}
          width={100}
          className="mr-4"
          style={{
            minWidth: 100,
            borderRadius: `50%`,
          }}
        />
      </div>

      <div className="justify-center items-center flex h-[100px] flex-col">
        <h1 className="font-black my-0 h-[58px] leading-none flex items-center">
          {titleSlot === undefined ? (
            <Link
              className="text-5xl font-freehand font-black leading-none no-underline text-primary"
              to={`/`}
            >
              {siteTitle}
            </Link>
          ) : (
            titleSlot
          )}
        </h1>
        <p className="text-foreground mb-0 mt-1">
          {author.summary}
        </p>
      </div>
    </div>
  );
};

export default Hero;
