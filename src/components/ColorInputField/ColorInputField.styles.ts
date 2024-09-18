import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IColorInputFieldStylesKey = keyof typeof colorInputFieldStyles;
export const colorInputFieldStyles = stylex.create({
  host: {},
  colorTag: {
    marginRight: spacingTokens.padding$2,
  },
});
