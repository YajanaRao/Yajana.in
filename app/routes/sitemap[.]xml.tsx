import { getPosts } from "@/lib/posts";

const SITE_URL = "https://yajana.in";

// Static, non-MDX pages that should be discoverable in search.
const STATIC_PATHS = [
  "/",
  "/about",
  "/now",
  "/notes",
  "/portfolio",
  "/resume",
  "/uses",
];

export async function loader() {
  const posts = getPosts();

  const urls = [
    ...STATIC_PATHS.map((path) => ({ path, lastmod: undefined as string | undefined })),
    ...posts.map((post) => ({
      path: `/${post.slug}`,
      lastmod: post.frontmatter.date,
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ path, lastmod }) => {
    const loc = `${SITE_URL}${path}`;
    return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
