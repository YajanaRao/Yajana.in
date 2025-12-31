import React from "react";

export function meta() {
  return [
    {
      title: "What am I doing now? - Yajana",
      description: "What am I doing now? What am I reading now?",
    },
  ];
}

function StartHerePage() {
  return (
    <div>
      <div>
        <h1 className="text-black dark:text-white">What am I doing now?</h1>
        <p className="text-black dark:text-white">
          Updated June 16th, 2025, from my Office in HSR Layout, Bangalore
        </p>
        <h3 className="text-black dark:text-white">
          Learning to build web applications
        </h3>
        <p className="text-black dark:text-white">
          I am curiously watching React and Remix v3 and ecosystem evolving. I
          am also exploring design systems.
        </p>
        <ul>
          <li>Remix / React Router v7</li>
          <li>Emotion CSS</li>
        </ul>
      </div>
      <div>
        <h1 className="text-black dark:text-white">What am I reading now</h1>
        <ul>
          <li className="text-black dark:text-white">
            Thinking, Fast and Slow by Daniel Kahneman
          </li>
          <li className="text-black dark:text-white">
            Krishnamurti's Notebook by Jiddu Krishnamurti
          </li>
          <li className="text-black dark:text-white">
            Skin in the Game by Nassim Nicholas Taleb
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StartHerePage;
