import stylex from '@stylexjs/stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';

export type ICopyableTextStylesKey = keyof typeof copyableTextStyles;
export const copyableTextStyles = stylex.create({
  inner: {
    display: 'inline-flex',
    gap: spacingTokens.padding$1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
  },
});
