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
import { colorPalettesVars } from './colorPalettes.stylex';
import { colorRolesVars as baseColorRolesVars } from './colorRoles.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-dark' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimaryThemeVars = {
  primary: colorPalettesVars.primary80,
  onPrimary: colorPalettesVars.primary20,
  primaryContainer: colorPalettesVars.primary30,
  onPrimaryContainer: colorPalettesVars.primary90,
};

const secondary: IColorRolesSecondaryThemeVars = {
  secondary: colorPalettesVars.secondary80,
  onSecondary: colorPalettesVars.secondary20,
  secondaryContainer: colorPalettesVars.secondary30,
  onSecondaryContainer: colorPalettesVars.secondary90,
};

const tertiary: IColorRolesTertiaryThemeVars = {
  tertiary: colorPalettesVars.tertiary80,
  onTertiary: colorPalettesVars.tertiary20,
  tertiaryContainer: colorPalettesVars.tertiary30,
  onTertiaryContainer: colorPalettesVars.tertiary90,
};

const error: IColorRolesErrorThemeVars = {
  error: colorPalettesVars.error80,
  onError: colorPalettesVars.error20,
  errorContainer: colorPalettesVars.error30,
  onErrorContainer: colorPalettesVars.error90,
};

const surfaceInverse: IColorRolesSurfaceInverseThemeVars = {
  inverseSurface: colorPalettesVars.neutral90,
  inverseOnSurface: colorPalettesVars.neutral20,
  inversePrimary: colorPalettesVars.primary40,
};

const surface: IColorRolesSurfaceThemeVars = {
  surface: colorPalettesVars.neutral6,
  onSurface: colorPalettesVars.neutral90,
  onSurfaceVariant: colorPalettesVars.neutralVariant80,
  surfaceContainerLowest: colorPalettesVars.neutral4,
  surfaceContainerLow: colorPalettesVars.neutral10,
  surfaceContainer: colorPalettesVars.neutral12,
  surfaceContainerHigh: colorPalettesVars.neutral17,
  surfaceContainerHighest: colorPalettesVars.neutral22,
  ...surfaceInverse,
};

const outline: IColorRolesOutlineThemeVars = {
  outline: colorPalettesVars.neutralVariant60,
  outlineVariant: colorPalettesVars.neutralVariant30,
};

const addOnsFixed: IColorRolesAddOnsFixedThemeVars = {
  primaryFixed: colorPalettesVars.primary90,
  secondaryFixed: colorPalettesVars.secondary90,
  tertiaryFixed: colorPalettesVars.tertiary90,
};

const addOnsDim: IColorRolesAddOnsDimThemeVars = {
  primaryFixedDim: colorPalettesVars.primary80,
  secondaryFixedDim: colorPalettesVars.secondary80,
  tertiaryFixedDim: colorPalettesVars.tertiary80,
  dim: colorPalettesVars.neutralVariant60,
};

const addOnsOnFixed: IColorRolesAddOnsOnFixedThemeVars = {
  onPrimaryFixed: colorPalettesVars.primary10,
  onSecondaryFixed: colorPalettesVars.secondary10,
  onTertiaryFixed: colorPalettesVars.tertiary10,
};

const addOnsOnFixedVariant: IColorRolesAddOnsOnFixedVariantThemeVars = {
  onPrimaryFixedVariant: colorPalettesVars.primary30,
  onSecondaryFixedVariant: colorPalettesVars.secondary30,
  onTertiaryFixedVariant: colorPalettesVars.tertiary30,
};

const addOns: IColorRolesAddOnsThemeVars = {
  ...addOnsFixed,
  ...addOnsDim,
  ...addOnsOnFixed,
  ...addOnsOnFixedVariant,
  surfaceDim: colorPalettesVars.neutral6,
  surfaceBright: colorPalettesVars.neutral24,
  surfacePlaceholder: colorPalettesVars.neutralVariant30,
};

export const darkColorRoles: IColorRolesThemeVars = {
  ...primary,
  ...secondary,
  ...tertiary,
  ...error,
  ...surface,
  ...outline,
  ...addOns,
  shadow: colorPalettesVars.neutral0,
  scrim: colorPalettesVars.neutral0,
  surfaceSelection: colorPalettesVars.neutralVariant50,
};

export const darkColorRolesTheme = stylex.createTheme(
  baseColorRolesVars,
  darkColorRoles,
);
