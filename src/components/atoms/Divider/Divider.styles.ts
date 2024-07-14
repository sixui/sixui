import stylex from '@stylexjs/stylex';

import { dividerTokens as vars } from './Divider.stylex';

export type IDividerStylesKey = keyof typeof dividerStyles;
export const dividerStyles = stylex.create({
  host: {
    display: 'flex',
    width: '100%',
    height: vars.thickness,
    color: vars.color,
  },
  line: {
    display: 'flex',
    flexGrow: 1,
    color: 'inherit',
    height: 'inherit',

    '::before': {
      background: 'currentColor',
      content: '',
      width: '100%',
      height: '100%',
      borderRadius: vars.shape,
    },
  },
  line$inset: {
    paddingInlineStart: vars.insetLeadingSpace,
    paddingInlineEnd: vars.insetTrailingSpace,
  },
  line$insetStart: {
    paddingInlineStart: vars.insetLeadingSpace,
  },
  line$insetEnd: {
    paddingInlineEnd: vars.insetTrailingSpace,
  },
  textContainer: {
    marginInlineStart: vars.textLeadingSpace,
    marginInlineEnd: vars.textTrailingSpace,
  },
  text: {
    textAlign: 'center',
    transform: 'translateY(-50%)',

    color: vars.textColor,
    fontFamily: vars.textFont,
    fontSize: vars.textSize,
    fontWeight: vars.textWeight,
    lineHeight: vars.textLineHeight,
    letterSpacing: vars.textLetterSpacing,
  },
});
