import stylex from '@stylexjs/stylex';

import type {
  IColorRolesAddOnsThemeVars,
  IColorRolesAddOnsDimThemeVars,
  IColorRolesAddOnsFixedThemeVars,
  IColorRolesAddOnsOnFixedThemeVars,
  IColorRolesAddOnsOnFixedVariantThemeVars,
  IColorRolesErrorThemeVars,
  IColorRolesOutlineThemeVars,
  IColorRolesPrimaryThemeVars,
  IColorRolesSecondaryThemeVars,
  IColorRolesSurfaceThemeVars,
  IColorRolesSurfaceInverseThemeVars,
  IColorRolesTertiaryThemeVars,
  IColorRolesThemeVars,
} from './colorRoles.types';
import { tonalPalettesTokens } from './tonalPalettes.stylex';
import { colorRolesTokens as baseColorRolesVars } from './colorRoles.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-dark' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimaryThemeVars = {
  primary: tonalPalettesTokens.primary80,
  onPrimary: tonalPalettesTokens.primary20,
  primaryContainer: tonalPalettesTokens.primary30,
  onPrimaryContainer: tonalPalettesTokens.primary90,
};

const secondary: IColorRolesSecondaryThemeVars = {
  secondary: tonalPalettesTokens.secondary80,
  onSecondary: tonalPalettesTokens.secondary20,
  secondaryContainer: tonalPalettesTokens.secondary30,
  onSecondaryContainer: tonalPalettesTokens.secondary90,
};

const tertiary: IColorRolesTertiaryThemeVars = {
  tertiary: tonalPalettesTokens.tertiary80,
  onTertiary: tonalPalettesTokens.tertiary20,
  tertiaryContainer: tonalPalettesTokens.tertiary30,
  onTertiaryContainer: tonalPalettesTokens.tertiary90,
};

const error: IColorRolesErrorThemeVars = {
  error: tonalPalettesTokens.error80,
  onError: tonalPalettesTokens.error20,
  errorContainer: tonalPalettesTokens.error30,
  onErrorContainer: tonalPalettesTokens.error90,
};

const surfaceInverse: IColorRolesSurfaceInverseThemeVars = {
  inverseSurface: tonalPalettesTokens.neutral90,
  inverseOnSurface: tonalPalettesTokens.neutral20,
  inversePrimary: tonalPalettesTokens.primary40,
};

const surface: IColorRolesSurfaceThemeVars = {
  surface: tonalPalettesTokens.neutral6,
  onSurface: tonalPalettesTokens.neutral90,
  onSurfaceVariant: tonalPalettesTokens.neutralVariant80,
  surfaceContainerLowest: tonalPalettesTokens.neutral4,
  surfaceContainerLow: tonalPalettesTokens.neutral10,
  surfaceContainer: tonalPalettesTokens.neutral12,
  surfaceContainerHigh: tonalPalettesTokens.neutral17,
  surfaceContainerHighest: tonalPalettesTokens.neutral22,
  ...surfaceInverse,
};

const outline: IColorRolesOutlineThemeVars = {
  outline: tonalPalettesTokens.neutralVariant60,
  outlineVariant: tonalPalettesTokens.neutralVariant30,
};

const addOnsFixed: IColorRolesAddOnsFixedThemeVars = {
  primaryFixed: tonalPalettesTokens.primary90,
  secondaryFixed: tonalPalettesTokens.secondary90,
  tertiaryFixed: tonalPalettesTokens.tertiary90,
};

const addOnsDim: IColorRolesAddOnsDimThemeVars = {
  primaryFixedDim: tonalPalettesTokens.primary80,
  secondaryFixedDim: tonalPalettesTokens.secondary80,
  tertiaryFixedDim: tonalPalettesTokens.tertiary80,
};

const addOnsOnFixed: IColorRolesAddOnsOnFixedThemeVars = {
  onPrimaryFixed: tonalPalettesTokens.primary10,
  onSecondaryFixed: tonalPalettesTokens.secondary10,
  onTertiaryFixed: tonalPalettesTokens.tertiary10,
};

const addOnsOnFixedVariant: IColorRolesAddOnsOnFixedVariantThemeVars = {
  onPrimaryFixedVariant: tonalPalettesTokens.primary30,
  onSecondaryFixedVariant: tonalPalettesTokens.secondary30,
  onTertiaryFixedVariant: tonalPalettesTokens.tertiary30,
};

const addOns: IColorRolesAddOnsThemeVars = {
  ...addOnsFixed,
  ...addOnsDim,
  ...addOnsOnFixed,
  ...addOnsOnFixedVariant,
  surfaceDim: tonalPalettesTokens.neutral6,
  surfaceBright: tonalPalettesTokens.neutral24,
};

export const darkColorRolesVars: IColorRolesThemeVars = {
  ...primary,
  ...secondary,
  ...tertiary,
  ...error,
  ...surface,
  ...outline,
  ...addOns,
  shadow: tonalPalettesTokens.neutral0,
  scrim: tonalPalettesTokens.neutral0,
};

export const darkColorRolesTheme = stylex.createTheme(
  baseColorRolesVars,
  darkColorRolesVars,
);
