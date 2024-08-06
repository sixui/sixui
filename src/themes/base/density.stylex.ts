import stylex from '@stylexjs/stylex';

import type { IDensityTheme } from './density.types';

export const densityTokens = stylex.defineVars<IDensityTheme>({
  scale: '0.75',
  minScale: '0.5',
  maxScale: '5',
  minTargetSize: '48px',
});
