import stylex from '@stylexjs/stylex';

import type { IDensityTheme } from './density.types';

export const densityTokens = stylex.defineVars<IDensityTheme>({
  interval: '4px',
  scale: '0',
  minTargetSize: '48px',
});
