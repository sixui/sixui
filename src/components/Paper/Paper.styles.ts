import stylex from '@stylexjs/stylex';

import { elevationTokens } from '@/components/Elevation/Elevation.stylex';
import { shapeTokens } from '@/themes/base/shape.stylex';
import { paperBaseTokens } from '@/components/PaperBase/PaperBase.stylex';
import { colorSchemeTokens } from '@/themes/base/colorScheme.stylex';

// https://github.com/material-components/material-web/blob/main/labs/Paper/internal/_shared.scss

export type IPaperStylesKey = keyof typeof paperStyles;
export const paperStyles = stylex.create({
  host: {
    [paperBaseTokens.textColor]: colorSchemeTokens.onSurface,
  },
  host$outlined: {
    [paperBaseTokens.outlineStyle]: 'solid',
  },
  elevation$0: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level0,
  },
  elevation$1: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level1,
  },
  elevation$2: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level2,
  },
  elevation$3: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level3,
  },
  elevation$4: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level4,
  },
  elevation$5: {
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level5,
  },
  corner$none: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$none,
  },
  corner$xs: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$xs,
  },
  corner$sm: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$sm,
  },
  corner$md: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$md,
  },
  corner$lg: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$lg,
  },
  corner$xl: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$xl,
  },
  corner$full: {
    [paperBaseTokens.containerShape]: shapeTokens.corner$full,
  },
  surface$none: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surface,
  },
  surface$lowest: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainerLowest,
  },
  surface$low: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainerLow,
  },
  surface$medium: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainer,
  },
  surface$high: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainerHigh,
  },
  surface$highest: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainerHighest,
  },
  surface$inverse: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.inverseSurface,
    [paperBaseTokens.textColor]: colorSchemeTokens.inverseOnSurface,
  },
  surface$primary: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.primaryContainer,
    [paperBaseTokens.textColor]: colorSchemeTokens.onPrimaryContainer,
  },
  surface$secondary: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.secondaryContainer,
    [paperBaseTokens.textColor]: colorSchemeTokens.onSecondaryContainer,
  },
  surface$tertiary: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.tertiaryContainer,
    [paperBaseTokens.textColor]: colorSchemeTokens.onTertiaryContainer,
  },
  surface$error: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.errorContainer,
    [paperBaseTokens.textColor]: colorSchemeTokens.onErrorContainer,
  },
});
