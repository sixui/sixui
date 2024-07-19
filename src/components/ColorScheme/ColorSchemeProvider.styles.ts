import stylex from '@stylexjs/stylex';

import { typeScaleTokens } from '@/themes/base/typeScale.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';

export const colorSchemeProviderStyles = stylex.create({
  host: {
    color: colorSchemeTokens.onSurface,
    fontFamily: typeScaleTokens.bodyFont$md,
    fontSize: typeScaleTokens.bodySize$md,
    fontWeight: typeScaleTokens.bodyWeight$md,
    lineHeight: typeScaleTokens.bodyLineHeight$md,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  },
  container$light: {
    colorScheme: 'light',
  },
  container$dark: {
    colorScheme: 'dark',
  },
});
