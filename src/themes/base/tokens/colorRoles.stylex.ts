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
} from '../../colorRoles.types';
import { colorPalettesTokens } from './colorPalettes.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-light' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimaryThemeVars = {
  primary: colorPalettesTokens.primary40,
  onPrimary: colorPalettesTokens.primary100,
  primaryContainer: colorPalettesTokens.primary90,
  onPrimaryContainer: colorPalettesTokens.primary10,
};

const secondary: IColorRolesSecondaryThemeVars = {
  secondary: colorPalettesTokens.secondary40,
  onSecondary: colorPalettesTokens.secondary100,
  secondaryContainer: colorPalettesTokens.secondary90,
  onSecondaryContainer: colorPalettesTokens.secondary10,
};

const tertiary: IColorRolesTertiaryThemeVars = {
  tertiary: colorPalettesTokens.tertiary40,
  onTertiary: colorPalettesTokens.tertiary100,
  tertiaryContainer: colorPalettesTokens.tertiary90,
  onTertiaryContainer: colorPalettesTokens.tertiary10,
};

const error: IColorRolesErrorThemeVars = {
  error: colorPalettesTokens.error40,
  onError: colorPalettesTokens.error100,
  errorContainer: colorPalettesTokens.error90,
  onErrorContainer: colorPalettesTokens.error10,
};

const surfaceInverse: IColorRolesSurfaceInverseThemeVars = {
  inverseSurface: colorPalettesTokens.neutral20,
  inverseOnSurface: colorPalettesTokens.neutral95,
  inversePrimary: colorPalettesTokens.primary80,
};

const surface: IColorRolesSurfaceThemeVars = {
  surface: colorPalettesTokens.neutral98,
  onSurface: colorPalettesTokens.neutral10,
  onSurfaceVariant: colorPalettesTokens.neutralVariant30,
  surfaceContainerLowest: colorPalettesTokens.neutral100,
  surfaceContainerLow: colorPalettesTokens.neutral96,
  surfaceContainer: colorPalettesTokens.neutral94,
  surfaceContainerHigh: colorPalettesTokens.neutral92,
  surfaceContainerHighest: colorPalettesTokens.neutral90,
  ...surfaceInverse,
};

const outline: IColorRolesOutlineThemeVars = {
  outline: colorPalettesTokens.neutralVariant50,
  outlineVariant: colorPalettesTokens.neutralVariant80,
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
  dim: colorPalettesTokens.neutralVariant50,
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
  surfaceDim: colorPalettesTokens.neutral87,
  surfaceBright: colorPalettesTokens.neutral98,
  surfacePlaceholder: colorPalettesTokens.neutralVariant80,
};

const colorRoles: IColorRolesThemeVars = {
  ...primary,
  ...secondary,
  ...tertiary,
  ...error,
  ...surface,
  ...outline,
  ...addOns,
  shadow: colorPalettesTokens.neutral0,
  scrim: colorPalettesTokens.neutral0,
  surfaceSelection: colorPalettesTokens.neutralVariant70,
};

export const colorRolesTokens = stylex.defineVars(colorRoles);

/**
 * This is a workaround to allow reaplying vars at the component level so that
 * it can uses themed vars.
 *
 * @see https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
 */
export const colorRolesTheme = stylex.createTheme(colorRolesTokens, colorRoles);
