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
      tagName: "link",
      rel: "canonical",
      href: `${siteUrl || "https://yajana.in"}/blog`,
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

      <div className="flex flex-col gap-16 not-prose">
        {posts.map((node) => {
          const { title, date, description } = node.frontmatter;
          return (
            <article key={node.slug}>
              <h2 className="m-0 font-heading text-[2rem] font-extrabold leading-snug">
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
                className="lede m-0 mt-3"
              />
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogIndex;
