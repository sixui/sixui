import stylex from '@stylexjs/stylex';

import type { IWindowSizeClassesTheme } from './windowSizeClasses.types';

const vars = {
  compact: '600px',
  medium: '840px',
  expanded: '1200px',
  large: '1600px',
  extraLarge: '9999px',
};

export const windowSizeClassesTokens =
  stylex.defineVars<IWindowSizeClassesTheme>(vars);
