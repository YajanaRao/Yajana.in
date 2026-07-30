import React from "react";
import { siteMetadata } from "../constants";

const Bio = () => {
  const { author, social } = siteMetadata;
  return (
    <div className="mb-4 flex flex-row items-center gap-4">
      <img
        src="/profile-picture.jpg"
        alt={author.name}
        className="my-0 h-[50px] w-[50px] shrink-0 rounded-full object-cover"
        width={50}
        height={50}
      />
      <p className="my-0 text-ink-primary">
        Personal blog by{" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          <strong>{author.name}</strong>
        </a>
        <br />
        <span className="text-ink-secondary">{author.summary}</span>
      </p>
    </div>
  );
};

export default Bio;
