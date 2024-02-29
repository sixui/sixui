declare module '*.svg' {
  export const ReactComponent: React.FC<
    React.SVGProps<React.SVGSVGElement> & { title?: string }
  >;
  const src: string;

  // eslint-disable-next-line import/no-default-export
  export default src;
}
