const wonk = { fontVariationSettings: '"SOFT" 0, "WONK" 1' } as const;

const Contact = () => {
  return (
    <>
      <div className="h-0.5 w-full bg-border" aria-hidden="true" />
      <section className="bg-primary-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-16 text-center lg:py-32">
          <p className="kicker m-0 flex items-center gap-2 text-[11px]">
            <span
              className="inline-block size-1.5 shrink-0 bg-primary"
              aria-hidden="true"
            />
            LET&apos;S TALK
          </p>

          <div className="flex flex-col gap-4">
            <h2
              className="m-0 font-heading text-4xl font-semibold not-italic text-ink-primary lg:text-6xl"
              style={wonk}
            >
              Let&apos;s talk
            </h2>
            <p
              className="m-0 font-content text-lg leading-relaxed text-ink-secondary"
              style={wonk}
            >
              Feel free to contact if you have any questions or if you are
              looking forward to collaborate.
            </p>
          </div>

          <div className="flex flex-col gap-2 font-content text-lg font-semibold text-primary">
            <a
              href="mailto:yajananrao@gmail.com"
              className="no-underline hover:underline"
              style={wonk}
            >
              yajananrao@gmail.com
            </a>
            <a
              href="https://twitter.com/yajanarao"
              target="_blank"
              rel="noreferrer"
              className="no-underline hover:underline"
              style={wonk}
            >
              @YajanaRao
            </a>
          </div>

          <a
            href="mailto:yajananrao@gmail.com"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-9 py-4 font-ui text-sm font-bold uppercase tracking-[0.06em] text-primary-foreground no-underline transition-colors duration-action ease-action hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
          >
            Say Hello
          </a>
        </div>
      </section>
    </>
  );
};

export default Contact;
