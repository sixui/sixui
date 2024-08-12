import stylex from '@stylexjs/stylex';

import type { ITypeFaceTheme } from './typeFace.types';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-typeface.scss

const vars = {
  brand: 'Roboto',
  plain: 'Roboto',
  weightRegular: '400',
  weightMedium: '500',
  weightBold: '700',
};

export const typeFaceTokens = stylex.defineVars<ITypeFaceTheme>(vars);
