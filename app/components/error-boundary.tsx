import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { Kicker } from "@/components/ui/kicker";

export function ErrorBoundary() {
  const error = useRouteError();

  let kicker = "Error";
  let heading = "Oops!";
  let detail = "Something went wrong.";
  let message: string | null = null;

  if (isRouteErrorResponse(error)) {
    kicker = `Error ${error.status}`;
    heading = error.status === 404 ? "Not found" : error.statusText || "Oops!";
    detail =
      error.status === 404
        ? "That page doesn't exist — it may have moved, or never been written."
        : "The server couldn't complete that request.";
    message = typeof error.data === "string" ? error.data : null;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-screen-md flex-col justify-center px-6 py-16">
      <Kicker>{kicker}</Kicker>
      <h1 className="mb-4 mt-0 font-heading text-5xl font-extrabold italic text-ink-primary">
        {heading}
      </h1>
      <p className="mb-6 mt-0 font-content text-lg text-ink-secondary">
        {detail}
      </p>

      {message ? (
        <pre className="mb-8 overflow-x-auto rounded-md bg-surface-recessed1 p-4 font-mono text-sm text-ink-primary">
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
