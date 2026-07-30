import React from "react";
import { Link } from "react-router";

import { Kicker } from "@/components/ui/kicker";

/**
 * No <Layout> wrapper here — root's default export already wraps every route in
 * it, so wrapping again rendered a second header, nav and footer on this page.
 */
const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Kicker>Error 404</Kicker>
      <h1 className="mb-4 mt-0 font-heading text-5xl font-extrabold italic text-ink-primary">
        Not found
      </h1>
      <p className="mb-8 mt-0 font-content text-lg text-ink-secondary">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
      <Link to="/" className="font-ui text-primary">
        Back to the blog
      </Link>
    </div>
  );
};

export default NotFoundPage;
