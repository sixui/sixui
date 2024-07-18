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

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-light' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimaryThemeVars = {
  primary: tonalPalettesTokens.primary40,
  onPrimary: tonalPalettesTokens.primary100,
  primaryContainer: tonalPalettesTokens.primary90,
  onPrimaryContainer: tonalPalettesTokens.primary10,
};

const secondary: IColorRolesSecondaryThemeVars = {
  secondary: tonalPalettesTokens.secondary40,
  onSecondary: tonalPalettesTokens.secondary100,
  secondaryContainer: tonalPalettesTokens.secondary90,
  onSecondaryContainer: tonalPalettesTokens.secondary10,
};

const tertiary: IColorRolesTertiaryThemeVars = {
  tertiary: tonalPalettesTokens.tertiary40,
  onTertiary: tonalPalettesTokens.tertiary100,
  tertiaryContainer: tonalPalettesTokens.tertiary90,
  onTertiaryContainer: tonalPalettesTokens.tertiary10,
};

const error: IColorRolesErrorThemeVars = {
  error: tonalPalettesTokens.error40,
  onError: tonalPalettesTokens.error100,
  errorContainer: tonalPalettesTokens.error90,
  onErrorContainer: tonalPalettesTokens.error10,
};

const surfaceInverse: IColorRolesSurfaceInverseThemeVars = {
  inverseSurface: tonalPalettesTokens.neutral20,
  inverseOnSurface: tonalPalettesTokens.neutral95,
  inversePrimary: tonalPalettesTokens.primary80,
};

const surface: IColorRolesSurfaceThemeVars = {
  surface: tonalPalettesTokens.neutral98,
  onSurface: tonalPalettesTokens.neutral10,
  onSurfaceVariant: tonalPalettesTokens.neutralVariant30,
  surfaceContainerLowest: tonalPalettesTokens.neutral100,
  surfaceContainerLow: tonalPalettesTokens.neutral96,
  surfaceContainer: tonalPalettesTokens.neutral94,
  surfaceContainerHigh: tonalPalettesTokens.neutral92,
  surfaceContainerHighest: tonalPalettesTokens.neutral90,
  ...surfaceInverse,
};

const outline: IColorRolesOutlineThemeVars = {
  outline: tonalPalettesTokens.neutralVariant50,
  outlineVariant: tonalPalettesTokens.neutralVariant80,
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
  surfaceDim: tonalPalettesTokens.neutral87,
  surfaceBright: tonalPalettesTokens.neutral98,
};

const colorRoles: IColorRolesThemeVars = {
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

export const colorRolesTokens = stylex.defineVars(colorRoles);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const colorRolesTheme = stylex.createTheme(colorRolesTokens, colorRoles);
