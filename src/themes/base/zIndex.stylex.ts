import stylex from '@stylexjs/stylex';

import type { IZIndexTheme } from './zIndex.types';

const vars = {
  app: '100',
  modal: '200',
  popover: '300',
  overlay: '400',
  max: '9999',
};

export const zIndexTokens = stylex.defineVars<IZIndexTheme>(vars);
