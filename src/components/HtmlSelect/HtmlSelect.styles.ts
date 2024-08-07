import stylex from '@stylexjs/stylex';

import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { fieldBaseTokens } from '../FieldBase/FieldBase.stylex';

export type IHtmlSelectStylesKey = keyof typeof htmlSelectStyles;
export const htmlSelectStyles = stylex.create({
  select: {
    flexGrow: 1,
    cursor: 'pointer',
    appearance: 'none',
    height: '100%',
    position: 'absolute',
    inset: 0,
    paddingLeft: fieldBaseTokens.leadingSpace,
    paddingRight: fieldBaseTokens.trailingSpace,
    paddingTop: fieldBaseTokens.topSpace,
    paddingBottom: fieldBaseTokens.bottomSpace,
  },
});

export const htmlSelectFieldBaseStyles = stylex.create({
  section$start: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingInlineStart: spacingTokens.padding$4,
    pointerEvents: 'none',
  },
  section$end: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: `calc(40px * ${scaleTokens.scale})`,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});
