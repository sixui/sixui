import stylex from '@stylexjs/stylex';

import type { IZIndexTheme } from './zIndex.types';

export const zIndexTokens = stylex.defineVars<IZIndexTheme>({
  app: '100',
  modal: '200',
  popover: '300',
  overlay: '400',
  max: '9999',
});
