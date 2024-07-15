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
import { colorPalettesTokens } from './colorPalettes.stylex';
import { colorRolesTokens as baseColorRolesVars } from './colorRoles.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-dark' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimaryThemeVars = {
  primary: colorPalettesTokens.primary80,
  onPrimary: colorPalettesTokens.primary20,
  primaryContainer: colorPalettesTokens.primary30,
  onPrimaryContainer: colorPalettesTokens.primary90,
};

const secondary: IColorRolesSecondaryThemeVars = {
  secondary: colorPalettesTokens.secondary80,
  onSecondary: colorPalettesTokens.secondary20,
  secondaryContainer: colorPalettesTokens.secondary30,
  onSecondaryContainer: colorPalettesTokens.secondary90,
};

const tertiary: IColorRolesTertiaryThemeVars = {
  tertiary: colorPalettesTokens.tertiary80,
  onTertiary: colorPalettesTokens.tertiary20,
  tertiaryContainer: colorPalettesTokens.tertiary30,
  onTertiaryContainer: colorPalettesTokens.tertiary90,
};

const error: IColorRolesErrorThemeVars = {
  error: colorPalettesTokens.error80,
  onError: colorPalettesTokens.error20,
  errorContainer: colorPalettesTokens.error30,
  onErrorContainer: colorPalettesTokens.error90,
};

const surfaceInverse: IColorRolesSurfaceInverseThemeVars = {
  inverseSurface: colorPalettesTokens.neutral90,
  inverseOnSurface: colorPalettesTokens.neutral20,
  inversePrimary: colorPalettesTokens.primary40,
};

const surface: IColorRolesSurfaceThemeVars = {
  surface: colorPalettesTokens.neutral6,
  onSurface: colorPalettesTokens.neutral90,
  onSurfaceVariant: colorPalettesTokens.neutralVariant80,
  surfaceContainerLowest: colorPalettesTokens.neutral4,
  surfaceContainerLow: colorPalettesTokens.neutral10,
  surfaceContainer: colorPalettesTokens.neutral12,
  surfaceContainerHigh: colorPalettesTokens.neutral17,
  surfaceContainerHighest: colorPalettesTokens.neutral22,
  ...surfaceInverse,
};

const outline: IColorRolesOutlineThemeVars = {
  outline: colorPalettesTokens.neutralVariant60,
  outlineVariant: colorPalettesTokens.neutralVariant30,
};

const addOnsFixed: IColorRolesAddOnsFixedThemeVars = {
  primaryFixed: colorPalettesTokens.primary90,
  secondaryFixed: colorPalettesTokens.secondary90,
  tertiaryFixed: colorPalettesTokens.tertiary90,
};

const addOnsDim: IColorRolesAddOnsDimThemeVars = {
  primaryFixedDim: colorPalettesTokens.primary80,
  secondaryFixedDim: colorPalettesTokens.secondary80,
  tertiaryFixedDim: colorPalettesTokens.tertiary80,
  dim: colorPalettesTokens.neutralVariant60,
};

const addOnsOnFixed: IColorRolesAddOnsOnFixedThemeVars = {
  onPrimaryFixed: colorPalettesTokens.primary10,
  onSecondaryFixed: colorPalettesTokens.secondary10,
  onTertiaryFixed: colorPalettesTokens.tertiary10,
};

const addOnsOnFixedVariant: IColorRolesAddOnsOnFixedVariantThemeVars = {
  onPrimaryFixedVariant: colorPalettesTokens.primary30,
  onSecondaryFixedVariant: colorPalettesTokens.secondary30,
  onTertiaryFixedVariant: colorPalettesTokens.tertiary30,
};

const addOns: IColorRolesAddOnsThemeVars = {
  ...addOnsFixed,
  ...addOnsDim,
  ...addOnsOnFixed,
  ...addOnsOnFixedVariant,
  surfaceDim: colorPalettesTokens.neutral6,
  surfaceBright: colorPalettesTokens.neutral24,
  surfacePlaceholder: colorPalettesTokens.neutralVariant30,
};

export const darkColorRolesVars: IColorRolesThemeVars = {
  ...primary,
  ...secondary,
  ...tertiary,
  ...error,
  ...surface,
  ...outline,
  ...addOns,
  shadow: colorPalettesTokens.neutral0,
  scrim: colorPalettesTokens.neutral0,
  surfaceSelection: colorPalettesTokens.neutralVariant50,
};

export const darkColorRolesTheme = stylex.createTheme(
  baseColorRolesVars,
  darkColorRolesVars,
);
