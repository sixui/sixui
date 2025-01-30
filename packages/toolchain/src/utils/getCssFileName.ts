// Change `.css.js` files to something else so that they don't get re-processed
// by consumer's setup.
export const getCssFileName = (name: string, ext: string): string =>
  `${name.replace(/\.css$/, '.css.vanilla')}${ext}`;
