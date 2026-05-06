import React from "react";
import { Link } from "react-router";

export function meta() {
  return [
    {
      title: "What am I doing now? - Yajana",
      description: "What am I doing now? What am I reading now?",
    },
  ];
}

function StartHerePage() {
  return (
    <div>
      <div>
        <h1 className="text-black dark:text-white">What am I doing now?</h1>
        <p className="text-black dark:text-white">
          Updated June 16th, 2025, from my Office in HSR Layout, Bangalore
        </p>
        <h3 className="text-black dark:text-white">
          Learning to build web applications
        </h3>
        <p className="text-black dark:text-white">
          I am curiously watching React and Remix v3 and ecosystem evolving. I
          am also exploring design systems.
        </p>
        <ul>
          <li>Remix / React Router v7</li>
          <li>Emotion CSS</li>
        </ul>
        <p className="text-black dark:text-white">
          See my
          <Link to="/uses" className="underline mx-1">
            /uses
          </Link>
          page for the tools I use everyday.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-black dark:text-white">Systems & Financial</h2>
        <p className="text-black dark:text-white">
          I track my investments and financial independence journey with the
          same rigor I apply to code. View my
          <Link to="/portfolio" className="underline mx-1">
            /portfolio
          </Link>
          to see real-time metrics, XIRR, and FIRE projections.
        </p>
      </div>

      <div className="mt-8">
        <h1 className="text-black dark:text-white">What am I reading now</h1>
        <ul>
          <li className="text-black dark:text-white">
            Determined: A Science of Life Without Free Will by Robert Sapolsky
          </li>
          <li className="text-black dark:text-white">
            Genome: The Autobiography of a Species in 23 Chapters by Matt Ridley
          </li>
        </ul>
        <p className="text-black dark:text-white">
          I write about what I learn in my{" "}
          <Link to="/notes" className="underline">
            /notes
          </Link>
          and collect passages that resonate in my
          <a
            target="_blank"
            className="mx-1"
            href="https://www.goodreads.com/yajanarao
"
          >
            reading
          </a>
          .
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-black dark:text-white">More about me</h2>
        <p className="text-black dark:text-white">
          Read my
          <Link to="/about" className="underline mx-1">
            /about
          </Link>
          page for the full story, or explore my{" "}
          <Link to="/" className="underline mx-1">
            /blog
          </Link>
          for all posts.
        </p>
      </div>
    </div>
  );
}

export default StartHerePage;
