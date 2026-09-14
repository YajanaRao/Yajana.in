export type Frontmatter = {
  title: string;
  categories: string;
  description: string;
  date: string;
};

export type PostMeta = {
  slug: string;
  frontmatter: Frontmatter;
};

export const getPosts = (): PostMeta[] => {
  const modules = import.meta.glob<{ frontmatter: Frontmatter }>(
    [
      "../routes/*.*.mdx",
      "../routes/*/route.mdx",
      "!../routes/draft.*.mdx",
      "!../routes/drafts/*",
    ],
    { eager: true }
  );
  const posts = Object.entries(modules).map(([file, post]) => {
    if (file.includes("route.mdx")) file = file.replace("/route.mdx", "");
    let id = file.replace("../", "").replace(/\.mdx$/, "");
    let slug = id.split("routes/")[1].replace(".", "/");
    if (slug === undefined) throw new Error(`No route for ${id}`);

    if (!post.frontmatter) {
      throw new Error(
        `No frontmatter exported by ${id}.mdx — the \`---\` block must be the ` +
          `very first thing in the file, with no blank line above it.`
      );
    }
    if (!post.frontmatter.date) {
      throw new Error(`Missing \`date\` in the frontmatter of ${id}.mdx`);
    }

    return {
      slug,
      frontmatter: post.frontmatter,
    };
  });
  return sortBy(posts, (post) => post.frontmatter.date, "desc");
};

function sortBy<T>(
  arr: T[],
  key: (item: T) => any,
  dir: "asc" | "desc" = "asc"
) {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === "asc" ? res : -res;
  });
}

function compare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
