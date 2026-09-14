import * as React from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import type { PostMeta } from "../lib/posts";

type Target = { label: string; to: string; kind: "page" | "post" };

const PAGES: Target[] = [
  { label: "Blogs", to: "/blog", kind: "page" },
  { label: "About", to: "/about", kind: "page" },
  { label: "Now", to: "/now", kind: "page" },
  { label: "Notes", to: "/notes", kind: "page" },
  { label: "Uses", to: "/uses", kind: "page" },
  { label: "Portfolio", to: "/portfolio", kind: "page" },
];

export function QuickSearch({ posts }: { posts: PostMeta[] }) {
  const navigate = useNavigate();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const results = React.useMemo<Target[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const pages = PAGES.filter((page) => page.label.toLowerCase().includes(q));
    const postHits = posts
      .filter(({ frontmatter: { title, categories } }) => {
        return (
          title?.toLowerCase().includes(q) ||
          categories?.toLowerCase().includes(q)
        );
      })
      .map<Target>((post) => ({
        label: post.frontmatter.title,
        to: `/${post.slug}`,
        kind: "post",
      }));
    return [...pages, ...postHits].slice(0, 8);
  }, [query, posts]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      const slash = event.key === "/" && !typing;
      const cmdK =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);
      if (slash || cmdK) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (target: Target) => {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
    navigate(target.to);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      event.currentTarget.blur();
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active] ?? results[0]);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-lede not-prose">
      <label htmlFor="quick-search" className="sr-only">
        Search posts, or jump to a page
      </label>
      <Input
        ref={inputRef}
        id="quick-search"
        type="search"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="quick-search-results"
        aria-activedescendant={
          open && results.length > 0 ? `qs-option-${active}` : undefined
        }
        autoComplete="off"
        placeholder="Search posts, or jump to a page…"
        className="py-3 pr-16 text-base"
        value={query}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      <kbd
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 font-ui text-xs text-ink-comment sm:block"
      >
        ⌘K
      </kbd>

      {open && results.length > 0 && (
        <ul
          id="quick-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 m-0 mt-1 list-none bg-popover p-0"
        >
          {results.map((result, index) => (
            <li
              key={result.to}
              id={`qs-option-${index}`}
              role="option"
              aria-selected={index === active}
              className={cn(
                "flex cursor-pointer items-baseline justify-between gap-4 px-5 py-3 font-ui text-base text-ink-primary",
                index === active && "bg-surface-raised"
              )}
              onMouseEnter={() => setActive(index)}
              onMouseDown={(event) => {
                event.preventDefault();
                go(result);
              }}
            >
              <span className="truncate">{result.label}</span>
              <span className="shrink-0 text-sm text-ink-comment">
                {result.kind}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
