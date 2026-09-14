import { useLoaderData, MetaFunction } from "react-router";

import * as introduction from "./introduction.mdx";
import * as basics from "./basics.mdx";
import * as variables from "./variables.mdx";
import * as arraysAndObjects from "./arrays-and-objects.mdx";
import * as functions from "./functions.mdx";
import * as events from "./events.mdx";

function postFromModule(mod: { frontmatter: any }) {
  return {
    ...mod.frontmatter,
  };
}

export async function loader() {
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

export const meta: MetaFunction = () => [
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
        <h2>{introduction.frontmatter.title}</h2>
        <p>{introduction.frontmatter.description}</p>
        <introduction.default />
      </section>

      <section id={basics.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{basics.frontmatter.title}</h2>
        <p>{basics.frontmatter.description}</p>
        <basics.default />
      </section>

      <section id={variables.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{variables.frontmatter.title}</h2>
        <p>{variables.frontmatter.description}</p>
        <variables.default />
      </section>

      <section
        id={arraysAndObjects.frontmatter.slug}
        style={{ marginBottom: 20 }}
      >
        <h2>{arraysAndObjects.frontmatter.title}</h2>
        <p>{arraysAndObjects.frontmatter.description}</p>
        <arraysAndObjects.default />
      </section>

      <section id={functions.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{functions.frontmatter.title}</h2>
        <p>{functions.frontmatter.description}</p>
        <functions.default />
      </section>

      <section id={events.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{events.frontmatter.title}</h2>
        <p>{events.frontmatter.description}</p>
        <events.default />
      </section>
    </div>
  );
}
