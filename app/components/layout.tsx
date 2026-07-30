import React from "react";
import { useLocation } from "react-router";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/about")) {
    return (
      <div className="min-h-screen bg-background">
        {children}
        <div className="mx-auto max-w-screen-md px-6 pb-8 sm:px-8">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container prose relative z-10 mx-auto max-w-screen-md px-6 py-8 dark:prose-invert sm:px-8">
        <Header />
        <main className="mb-16 mt-12">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
