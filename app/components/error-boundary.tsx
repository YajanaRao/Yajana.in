import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Kicker } from "@/components/ui/kicker";
import { siteMetadata } from "@/constants";

export function ErrorBoundary() {
  const error = useRouteError();
  const isDev = import.meta.env.DEV;

  let kicker = "Error";
  let heading = "Oops!";
  let detail = "Something went wrong.";
  let message: string | null = null;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    kicker = `Error ${error.status}`;
    heading = is404 ? "Not found" : error.statusText || "Oops!";
    detail = is404
      ? "That page doesn't exist — it may have moved, or never been written."
      : "The server couldn't complete that request.";
    // Route-match strings are noise for visitors; keep them in development only.
    if (isDev && typeof error.data === "string") {
      message = error.data;
    }
  } else if (error instanceof Error) {
    if (isDev) message = error.message;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-md flex-col justify-center px-6 py-16">
      <Link
        to="/"
        className="wordmark mb-10 inline-flex w-fit text-4xl leading-none no-underline"
      >
        {siteMetadata.title}
      </Link>
      <Kicker className="mb-2">{kicker}</Kicker>
      <h1 className="mb-4 mt-0 font-heading text-5xl font-extrabold text-ink-primary">
        {heading}
      </h1>
      <p className="lede mb-6 mt-0">{detail}</p>

      {message ? (
        <pre className="mb-8 overflow-x-auto bg-surface-recessed1 p-4 font-mono text-sm text-ink-primary">
          {message}
        </pre>
      ) : null}

      <p className="m-0">
        <Link
          to="/"
          className="font-ui text-primary underline decoration-primary/45 decoration-1 underline-offset-4 transition-colors duration-action ease-action hover:decoration-primary"
        >
          Back to the blog
        </Link>
      </p>
    </main>
  );
}
