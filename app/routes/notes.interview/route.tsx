import { useLoaderData, MetaFunction } from "react-router";

import * as BinarySearch from "./binary-search.mdx";
import * as TwoPointers from "./two-pointers.mdx";
import * as JavascriptQuestions from "./interview-questions.mdx";
import * as JSQuestions from "./js-questions.mdx";
import * as JSQuestions1 from "./js-questions-1.mdx";
import * as CssQuestions from "./css-questions.mdx";

function postFromModule(mod: { frontmatter: any }) {
  return {
    ...mod.frontmatter,
  };
}

export async function loader() {
  return [
    postFromModule(BinarySearch),
    postFromModule(TwoPointers),
    postFromModule(JavascriptQuestions),
    postFromModule(CssQuestions),
  ];
}

const ogImageUrl = "/images/interview.jpeg";

export const meta: MetaFunction = () => [
  {
    title: "Interview Preparation | Yajana",
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
    content: "Interview Preparation | Yajana's Blog",
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
      <h1>Interview Preparation</h1>
      <p>
        This is a collection of notes on Interview Preparation. This is a work
        in progress and will be updated regularly.
      </p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`#${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
      <section id={BinarySearch.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{BinarySearch.frontmatter.title}</h2>
        <p>{BinarySearch.frontmatter.description}</p>
        <BinarySearch.default />
      </section>

      <section id={TwoPointers.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{TwoPointers.frontmatter.title}</h2>
        <p>{TwoPointers.frontmatter.description}</p>
        <TwoPointers.default />
      </section>
      <section
        id={JavascriptQuestions.frontmatter.slug}
        style={{ marginBottom: 20 }}
      >
        <h2>{JavascriptQuestions.frontmatter.title}</h2>
        <p>{JavascriptQuestions.frontmatter.description}</p>
        <JavascriptQuestions.default />
        <JSQuestions.default />
        <JSQuestions1.default />
      </section>
      <section id={CssQuestions.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h2>{CssQuestions.frontmatter.title}</h2>
        <p>{CssQuestions.frontmatter.description}</p>
        <CssQuestions.default />
      </section>
    </div>
  );
}
