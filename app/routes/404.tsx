import React from "react";
import { Link } from "react-router";

import { Kicker } from "@/components/ui/kicker";
import { Prose } from "@/components/prose";

/**
 * Kept as a dedicated route composition. Unmatched URLs also surface through
 * root ErrorBoundary — keep the copy aligned with that component.
 */
const NotFoundPage = () => {
  return (
    <Prose>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <Kicker className="mb-2">Error 404</Kicker>
        <h1 className="mb-4 mt-0 font-heading text-5xl font-extrabold text-ink-primary">
          Not found
        </h1>
        <p className="lede mb-8 mt-0">
          That page doesn&apos;t exist — it may have moved, or never been
          written.
        </p>
        <Link to="/" className="font-ui text-primary">
          Back to the blog
        </Link>
      </div>
    </Prose>
  );
};

export default NotFoundPage;
