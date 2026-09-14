import React from "react";
import { Link, MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  {
    title: "Notes | Yajana's Blog",
  },
  {
    content: "Yajana Rao's blog on Programming, Spirituality and Books",
    name: "description",
  },
  {
    content: "/profile-picture.jpg",
    property: "image",
  },
  {
    content: "Notes | Yajana's Blog",
    property: "og:title",
  },
  {
    content: "Yajana Rao's blog on Programming, Spirituality and Books",
    name: "og:description",
  },
  {
    content: "/profile-picture.jpg",
    property: "og:image",
  },
  {
    content: "300",
    property: "og:image:width",
  },
  {
    content: "300",
    property: "og:image:height",
  },
  {
    content: "image/jpeg",
    property: "og:image:type",
  },
];

const categories = [
  {
    key: "c-programming",
    title: "C Programming",
    description: "Beginner concepts related to the C programming language",
    link: "c-programming",
  },
  {
    key: "javascript",
    title: "Javascript",
    description: "Fundamental programming concepts in JavaScript",
    link: "javascript",
  },
  {
    key: "sdlc",
    title: "SDLC",
    description: "Software development life cycle",
    link: "sdlc",
  },
  {
    key: "interview",
    title: "Interview Preparation",
    description: "Notes on interview preparation",
    link: "interview",
  },
] as const;

const NotesIndex = () => {
  return (
    <div className="not-prose">
      <h1 className="m-0 font-heading text-4xl font-extrabold text-ink-primary sm:text-5xl">
        Notes
      </h1>
      <p className="lede m-0 mt-3">
        Rough notes on programming and writing.
      </p>

      <ul className="mt-12 flex list-none flex-col gap-10 p-0">
        {categories.map((category) => (
          <li key={category.key}>
            <Link
              prefetch="intent"
              to={`/notes/${category.link}`}
              className="group font-heading text-[2rem] font-extrabold leading-snug text-ink-primary no-underline transition-colors duration-action ease-action hover:text-primary"
            >
              {category.title}
              <span
                aria-hidden
                className="inline-block translate-x-0 opacity-0 transition-all duration-action ease-action group-hover:translate-x-1 group-hover:opacity-100"
              >
                {" "}
                →
              </span>
            </Link>
            <p className="m-0 mt-1 font-content text-base text-ink-secondary">
              {category.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesIndex;
