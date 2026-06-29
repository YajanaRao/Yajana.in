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
        <div style={{ display: "flex" }}>
          <input
            type="text"
            id="search"
            name="q"
            placeholder="Search Blogs"
            autoFocus
            defaultValue={query}
            onChange={(event) =>
              setQuery(event.currentTarget.value?.toLowerCase())
            }
            className="bg-background text-foreground border-border placeholder:text-muted-foreground appearance-none w-full py-4 pl-7 pr-3 leading-tight rounded-full border focus:ring-primary"
          />
        </div>
      </form>
      <div className="py-2 mb-4 mx-auto flex items-center">
        <div className="w-full text-center mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              className={
                query === category
                  ? "m-1 px-4 py-1 rounded-full bg-primary text-primary-foreground"
                  : "m-1 px-4 py-1 rounded-full bg-secondary text-secondary-foreground"
              }
              type="button"
              onClick={() => {
                setQuery(category);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {posts.map((node) => {
        const { title, date, description } = node.frontmatter;
        return (
          <article key={node.slug} className="p-6 rounded-lg mb-6">
            <header>
              <h2 className="text-2xl mb-0 not-prose">
                <Link prefetch="intent" to={`/${node.slug}`}>
                  {title}
                </Link>
              </h2>
              <small className="text-muted-foreground">
                {dayjs(date).format("MMMM D, YYYY")}
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
                className="mt-2 mb-0"
              />
            </section>
          </article>
        );
      })}
    </div>
  );
};

export default BlogIndex;
