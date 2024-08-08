import stylex from '@stylexjs/stylex';

import { dividerTokens } from './Divider.stylex';

export type IDividerStylesKey = keyof typeof dividerStyles;
export const dividerStyles = stylex.create({
  host: {
    display: 'flex',
    color: dividerTokens.color,
    position: 'relative',
  },
  host$horizontal: {
    flexDirection: 'row',
    width: '100%',
    height: dividerTokens.thickness,
  },
  host$vertical: {
    flexDirection: 'column',
    width: dividerTokens.thickness,
    alignSelf: 'stretch',
  },
  line: {
    display: 'flex',
    flexGrow: 1,
    color: 'inherit',

    '::before': {
      background: 'currentColor',
      content: '',
      width: '100%',
      height: '100%',
      borderRadius: dividerTokens.shape,
    },
  },
  line$horizontal: {
    flexDirection: 'row',
    height: 'inherit',
  },
  line$vertical: {
    flexDirection: 'column',
    width: 'inherit',
  },
  line$horizontal$insetStart: {
    paddingInlineStart: dividerTokens.insetLeadingSpace,
  },
  line$vertical$insetStart: {
    paddingBlockStart: dividerTokens.insetLeadingSpace,
  },
  line$horizontal$insetEnd: {
    paddingInlineEnd: dividerTokens.insetTrailingSpace,
  },
  line$vertical$insetEnd: {
    paddingBlockEnd: dividerTokens.insetTrailingSpace,
  },
  textContainer$horizontal: {
    marginInlineStart: dividerTokens.textLeadingSpace,
    marginInlineEnd: dividerTokens.textTrailingSpace,
  },
  textContainer$vertical: {
    marginBlockStart: dividerTokens.textLeadingSpace,
    marginBlockEnd: dividerTokens.textTrailingSpace,
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateX(-50%) translateY(-50%)',

    color: dividerTokens.textColor,
    fontFamily: dividerTokens.textFont,
    fontSize: dividerTokens.textSize,
    fontWeight: dividerTokens.textWeight,
    lineHeight: dividerTokens.textLineHeight,
    letterSpacing: dividerTokens.textLetterSpacing,
  },
});
