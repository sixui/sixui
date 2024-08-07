import stylex from '@stylexjs/stylex';

import type { IScaleTheme } from './scale.types';

const vars = {
  scale: '1',
  minScale: '0.5',
  maxScale: '5',
};

export const scaleTokens = stylex.defineVars<IScaleTheme>(vars);
