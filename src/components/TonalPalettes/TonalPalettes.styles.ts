import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';

export const tonalPalettesStyles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '2rem',
    fontFamily: typeScaleTokens.labelFont$lg,
    fontSize: typeScaleTokens.labelSize$lg,
    fontWeight: typeScaleTokens.labelWeight$lg,
    lineHeight: typeScaleTokens.labelLineHeight$lg,
    letterSpacing: typeScaleTokens.labelLetterSpacing$lg,
  },
  tonalPalette: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '0.5rem',
  },
  title: {
    color: colorSchemeTokens.onSurface,
  },
});
