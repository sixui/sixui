import stylex from '@stylexjs/stylex';

import type { IColorScheme } from './colorScheme.types';
import { tonalPalettesTokens } from './tonalPalettes.stylex';
import { colorSchemeTokens as baseColorSchemeTokens } from './colorScheme.stylex';

export const darkColorScheme: IColorScheme = {
  primary: tonalPalettesTokens.primary80,
  onPrimary: tonalPalettesTokens.primary20,
  primaryContainer: tonalPalettesTokens.primary30,
  onPrimaryContainer: tonalPalettesTokens.primary90,
  secondary: tonalPalettesTokens.secondary80,
  onSecondary: tonalPalettesTokens.secondary20,
  secondaryContainer: tonalPalettesTokens.secondary30,
  onSecondaryContainer: tonalPalettesTokens.secondary90,
  tertiary: tonalPalettesTokens.tertiary80,
  onTertiary: tonalPalettesTokens.tertiary20,
  tertiaryContainer: tonalPalettesTokens.tertiary30,
  onTertiaryContainer: tonalPalettesTokens.tertiary90,
  error: tonalPalettesTokens.error80,
  onError: tonalPalettesTokens.error20,
  errorContainer: tonalPalettesTokens.error30,
  onErrorContainer: tonalPalettesTokens.error90,
  surface: tonalPalettesTokens.neutral6,
  onSurface: tonalPalettesTokens.neutral90,
  onSurfaceVariant: tonalPalettesTokens.neutralVariant80,
  surfaceContainerLowest: tonalPalettesTokens.neutral4,
  surfaceContainerLow: tonalPalettesTokens.neutral10,
  surfaceContainer: tonalPalettesTokens.neutral12,
  surfaceContainerHigh: tonalPalettesTokens.neutral17,
  surfaceContainerHighest: tonalPalettesTokens.neutral22,
  inverseSurface: tonalPalettesTokens.neutral90,
  inverseOnSurface: tonalPalettesTokens.neutral20,
  inversePrimary: tonalPalettesTokens.primary40,
  outline: tonalPalettesTokens.neutralVariant60,
  outlineVariant: tonalPalettesTokens.neutralVariant30,
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
  surfaceDim: tonalPalettesTokens.neutral6,
  surfaceBright: tonalPalettesTokens.neutral24,
  shadow: tonalPalettesTokens.neutral0,
  scrim: tonalPalettesTokens.neutral0,
};

export const darkColorSchemeTheme = stylex.createTheme(
  baseColorSchemeTokens,
  darkColorScheme,
);
