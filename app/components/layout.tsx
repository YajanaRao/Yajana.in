import React from "react";
import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full pt-8">
      <Header />
      <main className="mt-16 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
