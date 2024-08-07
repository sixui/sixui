import stylex from '@stylexjs/stylex';

import type { IDensityTheme } from './density.types';

const vars = {
  density: '0',
  interval: '4px',
  minTargetSize: '48px',
};

export const densityTokens = stylex.defineVars<IDensityTheme>(vars);
