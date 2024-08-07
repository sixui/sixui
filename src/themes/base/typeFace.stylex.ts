import stylex from '@stylexjs/stylex';

import type { ITypeFaceTheme } from './typeFace.types';

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-typeface.scss

const vars = {
  brand: 'Roboto',
  plain: 'Roboto',
  weightBold: '700',
  weightMedium: '500',
  weightRegular: '400',
};

export const typeFaceTokens = stylex.defineVars<ITypeFaceTheme>(vars);
