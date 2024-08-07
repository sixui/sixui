import stylex from '@stylexjs/stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type IMenuDividerStylesKey = keyof typeof menuDividerStyles;
export const menuDividerStyles = stylex.create({
  host: {
    marginTop: spacingTokens.padding$2,
    marginBottom: spacingTokens.padding$2,
  },
});
