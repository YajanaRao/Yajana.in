import * as React from "react";
import { Link } from "react-router";
import ProfilePic from "../assets/images/profile-pic.jpg";
import { siteMetadata } from "../constants";

const Hero = () => {
  const { author, title } = siteMetadata;

  return (
    <div className="flex flex-col sm:flex-row mt-10">
      <div className="justify-center items-center flex">
        <img
          src={ProfilePic}
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

      <div className="justify-center items-center flex flex-col">
        <h1 className="font-black mt-2 text-green-700 mb-3">
          <Link
            className="text-5xl font-freehand font-black no-underline"
            to={`/`}
          >
            {title}
          </Link>
        </h1>
        <p className="text-black dark:text-white mb-0 mt-0">{author.summary}</p>
      </div>
    </div>
  );
};

export default Hero;
