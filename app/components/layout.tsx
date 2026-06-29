import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-screen">
      <div
        className="container max-w-screen-md mx-auto p-8 prose dark:prose-invert relative z-10"
      >
        <Header />
        <main className="mb-16 mt-12">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
