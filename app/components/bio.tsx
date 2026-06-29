/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import { siteMetadata } from "../constants";

const Bio = () => {
  const { author, social } = siteMetadata;
  return (
    <div className="mb-2 flex items-center flex-row">
      <img
        src="/profile-picture.jpg"
        alt={author.name}
        className="mr-4 mb-1"
        style={{
          minWidth: 50,
          borderRadius: `50%`,
        }}
        width={"50"}
        height={"50"}
      />
      <p className="text-foreground">
        Personal blog by{" "}
        <a href={`https://twitter.com/${social.twitter}`}>
          <strong>{author.name}</strong>
        </a>
        <br />
        {author.summary}
      </p>
    </div>
  );
};

export default Bio;
