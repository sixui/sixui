import stylex from '@stylexjs/stylex';

import { fieldBaseTokens } from '~/components/FieldBase/FieldBase.stylex';

export type IHtmlSelectStylesKey = keyof typeof htmlSelectStyles;
export const htmlSelectStyles = stylex.create({
  select: {
    flexGrow: 1,
    cursor: 'pointer',
    appearance: 'none',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
});

export const htmlSelectFieldBaseStyles = stylex.create({
  host: {
    [fieldBaseTokens.topSpace]: '0px',
    [fieldBaseTokens.bottomSpace]: '0px',
    [fieldBaseTokens.leadingSpace]: '0px',
    [fieldBaseTokens.trailingSpace]: '0px',
  },
  section$start: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    paddingInlineStart: 16,
    pointerEvents: 'none',
  },
  section$end: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    pointerEvents: 'none',
  },
});
