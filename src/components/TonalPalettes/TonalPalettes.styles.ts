import stylex from '@stylexjs/stylex';

import { typescaleTokens } from '@/themes/base/typo.stylex';
import { colorRolesTokens } from '@/themes/base/colorRoles.stylex';

export const tonalPalettesStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
    fontFamily: typescaleTokens.labelFont$lg,
    fontSize: typescaleTokens.labelSize$lg,
    fontWeight: typescaleTokens.labelWeight$lg,
    lineHeight: typescaleTokens.labelLineHeight$lg,
    letterSpacing: typescaleTokens.labelLetterSpacing$lg,
  },
  tonalPalette: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
  },
  title: {
    color: colorRolesTokens.onSurface,
  },
});
