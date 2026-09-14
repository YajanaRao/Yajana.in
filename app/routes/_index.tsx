import * as React from "react";
import {
  Link,
  MetaFunction,
  redirect,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionProps, Variants } from "framer-motion";
import dayjs from "dayjs";
import { getPosts } from "../lib/posts";
import { QuickSearch } from "@/components/quick-search";
import { Prose } from "@/components/prose";

export const meta: MetaFunction<typeof loader> = (args) => {
  let { siteUrl } = args.data || {};
  return [
    {
      title: "Yajana Rao",
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
      content: "Yajana Rao",
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
            urlTemplate: "https://yajana.in/blog?q={search_term_string}",
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

  const q = requestUrl.searchParams.get("q");
  if (q) {
    throw redirect(`/blog?q=${encodeURIComponent(q)}`, 301);
  }

  let siteUrl = requestUrl.protocol + "//" + requestUrl.host;

  const posts = getPosts();

  return { siteUrl, posts };
};

const EXPLORE = [
  {
    label: "Book summaries",
    to: "/blog?q=book summary",
    description: "Notes from what I've been reading",
  },
  {
    label: "Now",
    to: "/now",
    description: "What I'm focused on at the moment",
  },
  {
    label: "Notes",
    to: "/notes",
    description: "Rough notes on programming and writing",
  },
  {
    label: "About",
    to: "/about",
    description: "Who I am, in more than one line",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.08 * i },
  }),
};

const Home = () => {
  const { posts } = useLoaderData<typeof loader>();
  const recent = posts.slice(0, 5);
  const reduceMotion = useReducedMotion();

  const anim = (i: number): MotionProps =>
    reduceMotion
      ? {}
      : {
          variants: reveal,
          initial: "hidden",
          animate: "show",
          custom: i,
        };

  return (
    <Prose>
      <div className="flex flex-col gap-14 not-prose">
        <motion.p
          {...anim(0)}
          className="mx-auto max-w-lede text-center font-content text-[19px] font-normal leading-[1.7] text-ink-primary"
        >
          This is my digital home — I write about{" "}
          <IntroLink to="/blog?q=tech">programming</IntroLink>,{" "}
          <IntroLink to="/blog?q=finance">money</IntroLink>,{" "}
          <IntroLink to="/blog?q=book summary">books</IntroLink>, and the search
          for a <IntroLink to="/blog?q=spirituality">quieter mind</IntroLink>.
        </motion.p>

        <motion.div {...anim(1)}>
          <QuickSearch posts={posts} />
        </motion.div>

        <div className="grid gap-14 sm:grid-cols-[1.35fr_1fr] sm:gap-20">
          <motion.section {...anim(2)} aria-labelledby="recent-writing">
            <p id="recent-writing" className="kicker">
              Recent writing
            </p>
            <ul className="mt-6 flex flex-col gap-6">
              {recent.map((post) => (
                <li key={post.slug}>
                  <Link
                    prefetch="intent"
                    to={`/${post.slug}`}
                    className="group font-ui text-lg font-medium leading-snug text-ink-primary no-underline transition-colors duration-action ease-action hover:text-primary"
                  >
                    {post.frontmatter.title}
                    <span
                      aria-hidden
                      className="inline-block translate-x-0 opacity-0 transition-all duration-action ease-action group-hover:translate-x-1 group-hover:opacity-100"
                    >
                      {" "}
                      →
                    </span>
                  </Link>
                  <p className="mt-0.5 font-ui text-sm text-ink-comment">
                    <time dateTime={post.frontmatter.date}>
                      {dayjs(post.frontmatter.date).format("MMMM YYYY")}
                    </time>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                to="/blog"
                className="group font-ui text-base font-medium text-primary no-underline"
              >
                All posts{" "}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-action ease-action group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </p>
          </motion.section>

          <motion.section {...anim(3)} aria-labelledby="explore">
            <p id="explore" className="kicker">
              Explore
            </p>
            <ul className="mt-6 flex flex-col gap-6">
              {EXPLORE.map((item) => (
                <li key={item.label}>
                  <Link
                    prefetch="intent"
                    to={item.to}
                    className="font-ui text-lg font-medium leading-snug text-ink-primary no-underline transition-colors duration-action ease-action hover:text-primary"
                  >
                    {item.label}
                  </Link>
                  <p className="mt-0.5 font-ui text-sm text-ink-secondary">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>
      </div>
    </Prose>
  );
};

const IntroLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="font-medium text-primary no-underline transition-colors duration-action ease-action hover:underline hover:underline-offset-4"
  >
    {children}
  </Link>
);

export default Home;
