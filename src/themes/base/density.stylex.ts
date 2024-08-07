import stylex from '@stylexjs/stylex';

import type { IDensityTheme } from './density.types';

const vars = {
  density: '0',
  interval: '4px',
  minTargetSize: 'max(100%, 48px)',
};

export const densityTokens = stylex.defineVars<IDensityTheme>(vars);
