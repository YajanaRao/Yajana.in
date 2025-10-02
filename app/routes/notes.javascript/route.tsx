import { useLoaderData } from "react-router";

import * as introduction from "./introduction.mdx";
import * as basics from "./basics.mdx";
import * as variables from "./variables.mdx";
import * as arraysAndObjects from "./arrays-and-objects.mdx";
import * as functions from "./functions.mdx";
import * as events from "./events.mdx";

function postFromModule(mod) {
  return {
    ...mod.frontmatter,
  };
}

export async function loader() {
  // Return metadata about each of the posts for display on the index page.
  // Referencing the posts here instead of in the Index component down below
  // lets us avoid bundling the actual posts themselves in the bundle for the
  // index page.
  return [
    postFromModule(introduction),
    postFromModule(basics),
    postFromModule(variables),
    postFromModule(arraysAndObjects),
    postFromModule(functions),
    postFromModule(events),
  ];
}

const ogImageUrl = "/images/javascript.png";

export const meta = [
  {
    title: "Javascript | Yajana",
  },
  {
    content: "Yajana Rao's blog on Programming, Spirituality and Books",
    name: "description",
  },
  {
    content: ogImageUrl,
    property: "image",
  },
  {
    content: "Javascript | Yajana's Blog",
    property: "og:title",
  },
  {
    content: "Yajana Rao's blog on Programming, Spirituality and Books",
    name: "og:description",
  },
  {
    content: ogImageUrl,
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

export default function Index() {
  const posts = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Javascript</h1>
      <p>
        This is a collection of notes on Javascript. This is a work in progress
        and will be updated regularly.
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`#${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>

      <section id={introduction.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{introduction.frontmatter.title}</h1>
        <p>{introduction.frontmatter.description}</p>
        <introduction.default />
      </section>

      <section id={basics.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{basics.frontmatter.title}</h1>
        <p>{basics.frontmatter.description}</p>
        <basics.default />
      </section>

      <section id={variables.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{variables.frontmatter.title}</h1>
        <p>{variables.frontmatter.description}</p>
        <variables.default />
      </section>

      <section
        id={arraysAndObjects.frontmatter.slug}
        style={{ marginBottom: 20 }}
      >
        <h1>{arraysAndObjects.frontmatter.title}</h1>
        <p>{arraysAndObjects.frontmatter.description}</p>
        <arraysAndObjects.default />
      </section>

      <section id={functions.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{functions.frontmatter.title}</h1>
        <p>{functions.frontmatter.description}</p>
        <functions.default />
      </section>

      <section id={events.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{events.frontmatter.title}</h1>
        <p>{events.frontmatter.description}</p>
        <events.default />
      </section>
    </div>
  );
}
