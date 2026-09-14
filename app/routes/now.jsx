import React from "react";
import { Link } from "react-router";
import { Kicker } from "@/components/ui/kicker";
import { Prose } from "@/components/prose";

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
    <Prose>
      <div>
        <div>
          <Kicker className="mb-2">Now</Kicker>
          <h1>What am I doing now?</h1>
          <p className="text-ink-secondary">
            Updated June 16th, 2025, from my Office in HSR Layout, Bangalore
          </p>
          <h2>Learning to build web applications</h2>
          <p>
            I am curiously watching React and Remix v3 and ecosystem evolving. I
            am also exploring design systems.
          </p>
          <ul>
            <li>Remix / React Router v7</li>
            <li>Emotion CSS</li>
          </ul>
          <p>
            See my{" "}
            <Link to="/uses" className="link">
              /uses
            </Link>{" "}
            page for the tools I use everyday.
          </p>
        </div>

        <div className="mt-8">
          <h2>Systems &amp; Financial</h2>
          <p>
            I track my investments and financial independence journey with the
            same rigor I apply to code. View my{" "}
            <Link to="/portfolio" className="link">
              /portfolio
            </Link>{" "}
            to see real-time metrics, XIRR, and FIRE projections.
          </p>
        </div>

        <div className="mt-8">
          <h2>What am I reading now</h2>
          <ul>
            <li>
              Determined: A Science of Life Without Free Will by Robert Sapolsky
            </li>
            <li>
              Genome: The Autobiography of a Species in 23 Chapters by Matt
              Ridley
            </li>
          </ul>
          <p>
            I write about what I learn in my{" "}
            <Link to="/notes" className="link">
              /notes
            </Link>{" "}
            and collect passages that resonate in my{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.goodreads.com/yajanarao"
              className="link"
            >
              reading
            </a>
            .
          </p>
        </div>

        <div className="mt-8">
          <h2>More about me</h2>
          <p>
            Read my{" "}
            <Link to="/about" className="link">
              /about
            </Link>{" "}
            page for the full story, or explore my{" "}
            <Link to="/blog" className="link">
              /blog
            </Link>{" "}
            for all posts.
          </p>
        </div>
      </div>
    </Prose>
  );
}

export default StartHerePage;
