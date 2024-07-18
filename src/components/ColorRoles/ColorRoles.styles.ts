import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/typo.stylex';

export const colorRolesStyles = stylex.create({
  host: {
    fontFamily: typescaleTokens.labelFont$sm,
    fontSize: typescaleTokens.labelSize$sm,
    fontWeight: typescaleTokens.labelWeight$sm,
    lineHeight: typescaleTokens.labelLineHeight$sm,
    letterSpacing: typescaleTokens.labelLetterSpacing$sm,
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
