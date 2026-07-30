import * as React from "react";
import {
  Link,
  MetaFunction,
  useLoaderData,
  useSearchParams,
  LoaderFunctionArgs,
} from "react-router";
import { getPosts } from "../lib/posts";
import { useUpdateQueryStringValueWithoutNavigation } from "../lib/utils";
import { Input } from "@/components/ui/input";
import { BadgeButton } from "@/components/ui/badge";
import dayjs from "dayjs";

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
      content: "Yajana's Blog",
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
    { tagName: "link", rel: "canonical", href: siteUrl || "https://yajana.in" },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Yajana N Rao",
        alternateName: "Yajana's Blog",
        url: "https://yajana.in",
        description: "Yajana Rao's blog on Programming, Spirituality and Books",
        author: { "@type": "Person", name: "Yajana N Rao" },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://yajana.in/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Yajana N Rao",
        url: "https://yajana.in",
        image: "https://yajana.in/profile-picture.jpg",
        jobTitle: "Software Engineer",
        sameAs: [
          "https://github.com/yajanarao",
          "https://twitter.com/yajanarao",
          "https://www.linkedin.com/in/yajanarao",
          "https://medium.com/@yajanarao",
          "https://yajanarao.substack.com/",
        ],
      },
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let requestUrl = new URL(request.url);
  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  const posts = getPosts();

  return { siteUrl, posts };
};

const BlogIndex = () => {
  const [searchParams] = useSearchParams();
  const { posts: allPosts } = useLoaderData<typeof loader>();
  const [queryValue, setQuery] = React.useState(() => {
    return searchParams.get("q") ?? "";
  });
  const query = queryValue.trim();

  useUpdateQueryStringValueWithoutNavigation("q", query);

  let categories = React.useMemo(
    () =>
      allPosts
        .flatMap((post) => post.frontmatter.categories ?? [])
        .map((category) => category.trim())
        .filter(Boolean)
        .filter((value, index, self) => self.indexOf(value) === index),
    [allPosts]
  );

  const posts = React.useMemo(
    () =>
      allPosts
        .filter((post) => {
          const { title, categories } = post.frontmatter;
          return (
            title?.toLowerCase().includes(query?.toLowerCase() || "") ||
            (categories &&
              categories?.toLowerCase().includes(query?.toLowerCase() || ""))
          );
        })
        .filter((post) => post),
    [query, allPosts]
  );

  return (
    <div>
      <form onChange={(e) => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">
          Search blogs
        </label>
        <Input
          id="search"
          name="q"
          type="search"
          placeholder="Search blogs"
          autoFocus
          defaultValue={query}
          onChange={(event) =>
            setQuery(event.currentTarget.value?.toLowerCase())
          }
        />
      </form>

      {/* Filter pills: green at rest, gold outline for the active one. */}
      <div className="mb-16 mt-4 flex flex-wrap justify-center gap-3 not-prose">
        {categories.map((category) => {
          const active = query === category;
          return (
            <BadgeButton
              key={category}
              variant={active ? "active" : "resting"}
              aria-pressed={active}
              onClick={() => setQuery(active ? "" : category)}
            >
              {category}
            </BadgeButton>
          );
        })}
      </div>

      {/* No card fills here: spacing is the primary separator (DESIGN.md,
          Layout). A background would be a second mechanism for a job the gap
          already does. */}
      <div className="flex flex-col gap-16 not-prose">
        {posts.map((node) => {
          const { title, date, description } = node.frontmatter;
          return (
            <article key={node.slug}>
              {/* Ink at rest, gold on hover — linkness is already obvious from
                  position in a list of titles, so the accent marks the one you
                  are acting on, not all ten. */}
              {/* Explicit scale, since not-prose opts out of prose sizing:
                  30 / 14 / 18. Upright semibold Fraunces, not extrabold-italic:
                  the title still clearly outranks the 18px lede, but reads as a
                  confident editorial headline instead of shouting. The script
                  wordmark carries the page's one slanted flourish; the titles
                  stay upright so the layout has a vertical anchor. */}
              <h2 className="m-0 font-heading text-3xl font-semibold not-italic leading-snug">
                <Link
                  prefetch="intent"
                  to={`/${node.slug}`}
                  className="text-ink-primary no-underline transition-colors duration-action ease-action hover:text-primary"
                >
                  {title}
                </Link>
              </h2>
              <p className="m-0 mt-2 font-ui text-sm text-ink-comment">
                <time dateTime={date}>
                  {dayjs(date).format("MMMM D, YYYY")}
                </time>
              </p>
              <p
                dangerouslySetInnerHTML={{ __html: description }}
                className="m-0 mt-3 font-ui text-lg text-ink-secondary"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogIndex;
