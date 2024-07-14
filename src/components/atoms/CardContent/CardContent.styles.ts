import stylex from '@stylexjs/stylex';

import { cardContentTokens as vars } from './CardContent.stylex';

export type ICardContentStylesKey = keyof typeof cardContentStyles;
export const cardContentStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    color: vars.textColor,

    paddingTop: vars.topSpace,
    paddingBottom: vars.bottomSpace,
    paddingLeft: vars.leadingSpace,
    paddingRight: vars.trailingSpace,
  },
  host$actionable: {
    paddingTop: vars.topSpace$actionable,
    paddingBottom: vars.bottomSpace$actionable,
    paddingLeft: vars.leadingSpace$actionable,
    paddingRight: vars.trailingSpace$actionable,
  },
});
