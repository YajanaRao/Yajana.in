import React from "react";
import { Link, useLocation } from "react-router";
import Hero from "./hero";
import Switch from "./switch";

const Header = React.memo(function Header() {
  const rootPath = `/`;
  const { pathname } = useLocation();
  const isRoot = pathname === rootPath;

  function Brand() {
    if (isRoot) {
      return <Hero />;
    } else {
      return null;
    }
  }

  function AppBar() {
    return (
      <div
        className="grid sm:grid-cols-2 grid-cols-1 mb-1"
        style={{ width: "100%" }}
      >
        <div className="flex items-center">
          {!isRoot && (
            <h2 className="justify-center flex sm:justify-start mb-0 mt-0 border-0">
              <Link
                prefetch="intent"
                className="text-3xl font-freehand text-black dark:text-white no-underline"
                to={`/`}
              >
                Yajana Rao
              </Link>
            </h2>
          )}
        </div>
        <div className="grid grid-cols-4 gap-4 mb-1 justify-center items-center">
          <Link
            prefetch="intent"
            to={`/`}
            className="text-lg no-underline hover:underline"
          >
            Blogs
          </Link>
          <Link
            prefetch="intent"
            to={`/notes/`}
            className="text-lg no-underline hover:underline"
          >
            Notes
          </Link>
          <Link
            prefetch="intent"
            to={`/about`}
            className="text-lg no-underline hover:underline"
          >
            About
          </Link>
          <Switch />
        </div>
      </div>
    );
  }

  return (
    <header
      className="mb-1"
      style={{
        display: `flex`,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar />
      <Brand />
    </header>
  );
});

export default Header;
