import { LoaderFunctionArgs, MetaFunction } from "react-router";

import * as drafts from "./drafts.mdx";

function postFromModule(mod: { frontmatter: any }) {
  return {
    ...mod.frontmatter,
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  return { siteUrl, posts: [postFromModule(drafts)] };
}

export const meta: MetaFunction<typeof loader> = (args) => {
  let { siteUrl } = args.data || {};
  return [
    {
      title: "Yajana's Blog",
    },
    {
      content: "Yajana Rao's blog on Programming, Spirituality and Books",
      name: "description",
    },
    {
      content: `${siteUrl}/profile-picture.jpg`,
      property: "image",
    },
    {
      content: "Writings | Yajana's Blog",
      property: "og:title",
    },
    {
      content: "Yajana Rao's blog on Programming, Spirituality and Books",
      name: "og:description",
    },
    {
      content: `${siteUrl}/profile-picture.jpg`,
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
};

export default function Index() {
  return (
    <div>
      <h1>Writings</h1>
      <p>
        Hi, I&apos;m Yajana Rao and you&apos;re looking at my knowledge garden,
        a place where I publish my raw notes and thoughts. Some of these notes
        graduate to become self-contained essays, while others remain seeded
        here, patiently waiting to be groomed someday.
      </p>
      <div
        className="border-l-4 border-primary py-2 pl-6 text-ink-secondary"
        role="alert"
      >
        <p className="font-semibold">Be warned</p>
        <p>
          Writings here are raw and haven&apos;t been edited, so expect
          grammatical and coherence issues in places.
        </p>
      </div>

      <section id={drafts.frontmatter.slug} style={{ marginBottom: 20 }}>
        <p>{drafts.frontmatter.description}</p>
        <drafts.default />
      </section>
    </div>
  );
}
