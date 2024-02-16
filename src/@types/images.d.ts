declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<
    React.SVGProps<React.SVGSVGElement> & { title?: string }
  >;
  const src: string;

  // eslint-disable-next-line import/no-default-export
  export default src;
}
