import React from "react";

import Layout from "@/components/layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <div>
        <div
          style={{ height: "75vh" }}
          className="flex items-center justify-center flex-col"
        >
          <h1 className="text-foreground">Not Found</h1>
          <p className="text-foreground">
            You just hit a route that doesn&#39;t exist... the sadness.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
