import * as React from "react";
import { Prose } from "@/components/prose";

export const meta = () => {
  return [
    {
      title: "Uses - Yajana Rao",
      description: "My Hardware and Software Setup",
    },
  ];
};

const UsesPage = () => {
  return (
    <Prose>
      <div>
        <div>
          <h1>Uses</h1>
          <p className="lede">Hardware and software I use every day.</p>
          <h2>Tech</h2>
          <ul>
            <li>React.js</li>
            <li>
              <b>Remix / React Router V7</b>- Framework of choice for buidling
              web apps
            </li>
            <li>TypeScript - Superset of JavaScript</li>
            <li>
              <b>React Native</b>- Framework of choice for buildling mobile
              applications
            </li>
            <li>Vitest - Testing framework</li>
            <li>Tailwind CSS - Utility first CSS framework</li>
            <li>ShadCN - Component Library</li>
            <li>Zustand - State management library</li>
            <li>Framer Motion - Animation library</li>
            <li>Tan Stack Query</li>
          </ul>
          <h2>Coding setup</h2>
          <ul>
            <li>Homebrew - Package manager for MacOS</li>
            <li>Aerospace - Tiling Window Manager</li>
            <li>Ghostty - Cross platform feature rich terminal</li>
            <li>
              NVIM - Hackable Personal Development Environment.
              <a
                href="https://github.com/YajanaRao/kickstart.nvim"
                className="mx-2"
              >
                My config
              </a>
            </li>
            <li>
              <a href="https://github.com/YajanaRao/forestflower">
                Forestflower - Colorscheme
              </a>
            </li>
            <li>Giest and Maplo font</li>
            <li>Lazygit</li>
            <li>Starship Crosss-shell prompt</li>
            <li>Fish Shell</li>
          </ul>
          <h2>Desktop Apps</h2>
          <ul>
            <li>Spotify</li>
            <li>Brave Browser</li>
            <li>Bitwarden</li>
          </ul>
          <h2>Services</h2>
          <ul>
            <li>Vercel - Hosting platform</li>
            <li>Github - Code hosting platform</li>
            <li>ChatGPT - AI assistant</li>
            <li>Claude - AI assistant</li>
          </ul>
        </div>
      </div>
    </Prose>
  );
};

export default UsesPage;
