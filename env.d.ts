/// <reference types="vite/client" />
/// <reference types="@react-router/node" />

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export const frontmatter: any;
  export default MDXComponent;
}
