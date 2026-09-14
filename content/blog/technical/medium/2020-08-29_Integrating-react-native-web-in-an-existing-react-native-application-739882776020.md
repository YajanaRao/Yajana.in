---
title: Integrating react-native-web in an existing react native application
description: >-
  For using react native on web we can use many web tools. Create React App
  template is used for this example.
date: "2020-08-29T17:24:49.380Z"
categories: react-native
---

For using [react native on web](https://github.com/necolas/react-native-web) we can use many web tools. [Create React App](https://github.com/facebook/create-react-app) template is used for this example.

Create React App is a tool (built by developers at Facebook) that gives you a massive head start when building React apps. It saves you from time-consuming setup and configuration. You simply run one command and Create React App sets up the tools you need to start your React project.

### Install required packages for web

“React Native for Web” makes it possible to run [React Native](https://facebook.github.io/react-native/) components and APIs on the web using React DOM. So add react-native-web and react-dom to your dependencies

`yarn add react-native-web react-dom` or `npm I react-native-web react-dom`

#### dev dependencies

_react-scripts_ package includes scripts and configuration used by [Create React App](https://github.com/facebook/create-react-app)

`yarn add -dev react-scripts babel-jest` or `npm install --save-dev react-scripts babel-jest`

### Create project structure

**1\. Create _public/_ folder in root directory**

mkdir public

Create a html file and add basic html and paste the html content

touch index.html

The web app manifest is a JSON file that tells the browser about your Progressive Web App and how it should behave when installed on the user’s desktop or mobile device. A typical manifest file includes the app name, the icons the app should use, and the URL that should be opened when the app is launched.

touch manifest.json

**2\. Create \`src/\` directory in root folder**

Create _serviceWorker.js_ for PWA

A progressive web application is a type of application software delivered through the web, built using common web technologies including HTML, CSS and JavaScript.

A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don’t need a web page or user interaction.

Create an _index.js_ file. Ideally importing your root component here should work unless you have some native dependencies which does not have web support.

**Update _scripts_ property of the package.json file**

Add in _package.json_ to bottom of _scripts_ property

"web": "react-scripts start",  
"build": "react-scripts build"

Now executing below command in the root directory of your project.

npm run web

or

yarn web

and it should start developer server at [_http://localhost:3000_](http://localhost:3000) run _build_ to create production bundle

### References

- [https://callstack.github.io/react-native-paper/using-on-the-web.html](https://callstack.github.io/react-native-paper/using-on-the-web.html)
- [https://web.dev/add-manifest/](https://web.dev/add-manifest/)
- [https://necolas.github.io/react-native-web/docs/?path=/docs/guides-multi-platform--page](https://necolas.github.io/react-native-web/docs/?path=/docs/guides-multi-platform--page)
- [https://developers.google.com/web/fundamentals/primers/service-workers](https://developers.google.com/web/fundamentals/primers/service-workers)
