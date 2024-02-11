/* eslint-disable @typescript-eslint/no-explicit-any */

declare module 'recma-import-images';
declare module 'remark-rehype-wrap';
declare module 'unified-conditional';

declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}
