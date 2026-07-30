import * as React from "react";

function BookSummary() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-card md:max-w-2xl not-prose">
      <div className="md:flex">
        <div className="md:shrink-0 flex items-center justify-center">
          <img
            className="h-48 object-cover md:h-full md:w-42"
            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1714172313l/242472._SX98_.jpg"
            alt="Modern building architecture"
          />
        </div>
        <div className="p-8">
          <a
            className="kicker text-sm no-underline"
            href="https://www.goodreads.com/review/list/164445773-yajana-rao"
          >
            View all my reviews
          </a>
          <h4 className="font-heading font-extrabold italic tracking-tight text-ink-primary">
            <a href="https://www.goodreads.com/book/show/242472.The_Black_Swan">
              The Black Swan: The Impact of the Highly Improbable
            </a>{" "}
            by{" "}
            <a href="https://www.goodreads.com/author/show/21559.Nassim_Nicholas_Taleb">
              Nassim Nicholas Taleb
            </a>
          </h4>
          <p className="mb-0 text-ink-secondary">
            Entertaining and Eye opening 👌🏻 I had read The beginning of Infinity
            recently and I had been thinking of inductivism and uncertainty.
            This book covers in depth into randomness and handling black swan
            events.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookSummary;
