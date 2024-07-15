import stylex from '@stylexjs/stylex';

import { dividerTokens } from './Divider.stylex';

export type IDividerStylesKey = keyof typeof dividerStyles;
export const dividerStyles = stylex.create({
  host: {
    display: 'flex',
    width: '100%',
    height: dividerTokens.thickness,
    color: dividerTokens.color,
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
      borderRadius: dividerTokens.shape,
    },
  },
  line$inset: {
    paddingInlineStart: dividerTokens.insetLeadingSpace,
    paddingInlineEnd: dividerTokens.insetTrailingSpace,
  },
  line$insetStart: {
    paddingInlineStart: dividerTokens.insetLeadingSpace,
  },
  line$insetEnd: {
    paddingInlineEnd: dividerTokens.insetTrailingSpace,
  },
  textContainer: {
    marginInlineStart: dividerTokens.textLeadingSpace,
    marginInlineEnd: dividerTokens.textTrailingSpace,
  },
  text: {
    textAlign: 'center',
    transform: 'translateY(-50%)',

    color: dividerTokens.textColor,
    fontFamily: dividerTokens.textFont,
    fontSize: dividerTokens.textSize,
    fontWeight: dividerTokens.textWeight,
    lineHeight: dividerTokens.textLineHeight,
    letterSpacing: dividerTokens.textLetterSpacing,
  },
});
