import { siteMetadata } from "../constants";

const { author, social } = siteMetadata;

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: `https://twitter.com/${social.twitter}` },
  { label: "GitHub", href: `https://github.com/${social.github}` },
  { label: "Substack", href: social.substack },
  { label: "LinkedIn", href: `https://www.linkedin.com/in/${social.linkedin}` },
] as const;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-[1164px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="m-0 font-ui text-[13px] text-ink-comment">
          © {year} {author.name}
        </p>
        <nav
          aria-label="Social"
          className="flex flex-wrap items-center gap-5"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="font-ui text-[13px] text-ink-secondary no-underline transition-colors duration-action ease-action hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
