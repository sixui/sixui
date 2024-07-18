import stylex from '@stylexjs/stylex';

import type { IColorScheme } from './colorScheme.types';
import { tonalPalettesTokens } from './tonalPalettes.stylex';

const colorScheme: IColorScheme = {
  primary: tonalPalettesTokens.primary40,
  onPrimary: tonalPalettesTokens.primary100,
  primaryContainer: tonalPalettesTokens.primary90,
  onPrimaryContainer: tonalPalettesTokens.primary10,
  secondary: tonalPalettesTokens.secondary40,
  onSecondary: tonalPalettesTokens.secondary100,
  secondaryContainer: tonalPalettesTokens.secondary90,
  onSecondaryContainer: tonalPalettesTokens.secondary10,
  tertiary: tonalPalettesTokens.tertiary40,
  onTertiary: tonalPalettesTokens.tertiary100,
  tertiaryContainer: tonalPalettesTokens.tertiary90,
  onTertiaryContainer: tonalPalettesTokens.tertiary10,
  error: tonalPalettesTokens.error40,
  onError: tonalPalettesTokens.error100,
  errorContainer: tonalPalettesTokens.error90,
  onErrorContainer: tonalPalettesTokens.error10,
  surface: tonalPalettesTokens.neutral98,
  onSurface: tonalPalettesTokens.neutral10,
  onSurfaceVariant: tonalPalettesTokens.neutralVariant30,
  surfaceContainerLowest: tonalPalettesTokens.neutral100,
  surfaceContainerLow: tonalPalettesTokens.neutral96,
  surfaceContainer: tonalPalettesTokens.neutral94,
  surfaceContainerHigh: tonalPalettesTokens.neutral92,
  surfaceContainerHighest: tonalPalettesTokens.neutral90,
  inverseSurface: tonalPalettesTokens.neutral20,
  inverseOnSurface: tonalPalettesTokens.neutral95,
  inversePrimary: tonalPalettesTokens.primary80,
  outline: tonalPalettesTokens.neutralVariant50,
  outlineVariant: tonalPalettesTokens.neutralVariant80,
  primaryFixed: tonalPalettesTokens.primary90,
  secondaryFixed: tonalPalettesTokens.secondary90,
  tertiaryFixed: tonalPalettesTokens.tertiary90,
  primaryFixedDim: tonalPalettesTokens.primary80,
  secondaryFixedDim: tonalPalettesTokens.secondary80,
  tertiaryFixedDim: tonalPalettesTokens.tertiary80,
  onPrimaryFixed: tonalPalettesTokens.primary10,
  onSecondaryFixed: tonalPalettesTokens.secondary10,
  onTertiaryFixed: tonalPalettesTokens.tertiary10,
  onPrimaryFixedVariant: tonalPalettesTokens.primary30,
  onSecondaryFixedVariant: tonalPalettesTokens.secondary30,
  onTertiaryFixedVariant: tonalPalettesTokens.tertiary30,
  surfaceDim: tonalPalettesTokens.neutral87,
  surfaceBright: tonalPalettesTokens.neutral98,
  shadow: tonalPalettesTokens.neutral0,
  scrim: tonalPalettesTokens.neutral0,
};

export const colorSchemeTokens = stylex.defineVars(colorScheme);
export const colorSchemeTheme = stylex.createTheme(
  colorSchemeTokens,
  colorScheme,
);
