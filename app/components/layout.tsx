import React from "react";
import Footer from "./footer";
import Header from "./header";
import SkyBirds from "./sky-birds";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sky-bg dark:bg-[#16181b] min-h-screen overflow-hidden">
      <SkyBirds />
      <div className="container max-w-screen-md mx-auto p-8 prose dark:prose-invert relative z-[2]">
        <Header />
        <main className="mb-16 mt-12">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
