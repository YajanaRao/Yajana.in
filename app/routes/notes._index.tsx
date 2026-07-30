import React from "react";
import { Link } from "react-router";
import { Card, CardTitle } from "@/components/ui/card";

export const meta = [
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

const Courses = ({}) => {
  const categories = [
    {
      key: "c-programming",
      title: "C Programming",
      description: "Beginer concepts related to c programming language",
      link: "c-programming",
      image: "/images/c-program.png",
    },
    {
      key: "javascript",
      title: "Javascript",
      description: "Fundamental programming concepts in JavaScript.",
      link: "javascript",
      image: "/images/javascript.png",
    },
    {
      key: "sdlc",
      title: "SDLC",
      description: "Software development life cycle",
      link: "sdlc",
      image: "/images/sdlc.png",
    },
    {
      key: "interview",
      title: "Interview Preparation",
      description: "Notes on interview preparation",
      link: "interview",
      image: "/images/interview.jpeg",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
        {categories.map((category, index) => {
          return (
            <article key={index}>
              <Card className="flex h-full flex-col overflow-hidden">
                <img
                  className="mb-0 mt-0 min-h-60 w-full object-cover"
                  src={category.image}
                  alt={category.title}
                  width={640}
                  height={240}
                />
                <div className="flex flex-1 flex-col px-6 py-6">
                  <CardTitle className="mb-2">{category.title}</CardTitle>
                  <p className="mb-6 mt-0 font-content text-ink-secondary">
                    {category.description}
                  </p>
                  <Link
                    to={`/notes/${category.link}`}
                    className="mt-auto inline-flex h-10 w-fit items-center justify-center rounded-sm bg-primary px-4 font-ui text-sm font-medium text-primary-foreground no-underline transition-colors duration-action ease-action hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Visit
                  </Link>
                </div>
              </Card>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
