import { useLoaderData, MetaFunction } from "react-router";

import * as introduction from "./sdlc-introduction.mdx";
import * as sdlcModels from "./sdlc-models.md";

function postFromModule(mod: { frontmatter: any }) {
  return {
    ...mod.frontmatter,
  };
}

export async function loader() {
  return [postFromModule(introduction), postFromModule(sdlcModels)];
}

const ogImageUrl = "/images/sdlc.png";

export const meta: MetaFunction = () => [
  {
    title: "Software Development Lifecycle | Yajana",
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
    content: "Software Development Lifecycle | Yajana's Blog",
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
      <h1>Software Development Lifecycle</h1>
      <p>
        This is a collection of notes on SDLC. This is a work in progress and
        will be updated regularly.
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

      <section id={sdlcModels.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{sdlcModels.frontmatter.title}</h2>
        <p>{sdlcModels.frontmatter.description}</p>
        <sdlcModels.default />
      </section>
    </div>
  );
}
