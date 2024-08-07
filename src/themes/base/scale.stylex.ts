import stylex from '@stylexjs/stylex';

import type { IScaleTheme } from './scale.types';

const vars = {
  scale: '1',
};

export const scaleTokens = stylex.defineVars<IScaleTheme>(vars);
