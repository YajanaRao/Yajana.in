import React from "react";
import { Link } from "react-router";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category, index) => {
          return (
            <article key={index}>
              <div className="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg flex flex-col">
                <div className="">
                  <img
                    className="rounded-t-lg mb-0 min-h-60"
                    src={category.image}
                    alt={category.title}
                    style={{ width: "100%" }}
                    width={"0"}
                    height={"100"}
                  />
                </div>
                <div className="px-4 py-6">
                  <h3 className="text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer mt-0">
                    {category.title}
                  </h3>
                  <p className="text-gray-700 tracking-wide mb-2">
                    {category.description}
                  </p>
                  <Link
                    className="bg-green-600 hover:shadow-lg transition duration-300 text-white font-bold py-2 px-4 rounded-lg shadow-md "
                    to={`/notes/${category.link}`}
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
