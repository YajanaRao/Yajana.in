import { useLoaderData } from "react-router";

import * as BinarySearch from "./binary-search.mdx";
import * as TwoPointers from "./two-pointers.mdx";
import * as JavascriptQuestions from "./interview-questions.mdx";
import * as JSQuestions from "./js-questions.mdx";
import * as JSQuestions1 from "./js-questions-1.mdx";
import * as CssQuestions from "./css-questions.mdx";

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
    postFromModule(BinarySearch),
    postFromModule(TwoPointers),
    postFromModule(JavascriptQuestions),
    postFromModule(CssQuestions),
  ];
}

const ogImageUrl = "/images/interview.jpeg";

export const meta = [
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
        <h1>{BinarySearch.frontmatter.title}</h1>
        <p>{BinarySearch.frontmatter.description}</p>
        <BinarySearch.default />
      </section>

      <section id={TwoPointers.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{TwoPointers.frontmatter.title}</h1>
        <p>{TwoPointers.frontmatter.description}</p>
        <TwoPointers.default />
      </section>
      <section
        id={JavascriptQuestions.frontmatter.slug}
        style={{ marginBottom: 20 }}
      >
        <h1>{JavascriptQuestions.frontmatter.title}</h1>
        <p>{JavascriptQuestions.frontmatter.description}</p>
        <JavascriptQuestions.default />
        <JSQuestions.default />
        <JSQuestions1.default />
      </section>
      <section id={CssQuestions.frontmatter.slug} style={{ marginBottom: 20 }}>
        <h1>{CssQuestions.frontmatter.title}</h1>
        <p>{CssQuestions.frontmatter.description}</p>
        <CssQuestions.default />
      </section>
    </div>
  );
}
