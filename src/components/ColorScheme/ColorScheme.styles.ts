import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '~/themes/base/typeScale.stylex';

export const colorSchemeStyles = stylex.create({
  host: {
    fontFamily: typeScaleTokens.labelFont$sm,
    fontSize: typeScaleTokens.labelSize$sm,
    fontWeight: typeScaleTokens.labelWeight$sm,
    lineHeight: typeScaleTokens.labelLineHeight$sm,
    letterSpacing: typeScaleTokens.labelLetterSpacing$sm,
  },
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 1,
    flexBasis: 0,
  },
  gapX$sm: {
    columnGap: '0.25rem',
  },
  gapX$lg: {
    columnGap: '1rem',
  },
  gapY$sm: {
    rowGap: '0.25rem',
  },
  gapY$lg: {
    rowGap: '1rem',
  },
  width$sm: {
    width: 200,
  },
  width$lg: {
    width: 600,
  },
});
