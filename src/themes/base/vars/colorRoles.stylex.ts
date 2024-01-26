import * as stylex from '@stylexjs/stylex';

import type {
  IColorRolesAddOns,
  IColorRolesAddOnsDim,
  IColorRolesAddOnsFixed,
  IColorRolesAddOnsOnFixed,
  IColorRolesAddOnsOnFixedVariant,
  IColorRolesError,
  IColorRolesOutline,
  IColorRolesPrimary,
  IColorRolesSecondary,
  IColorRolesSurface,
  IColorRolesSurfaceInverse,
  IColorRolesTertiary,
  IColorRoles,
} from '../../colorRoles.types';
import { colorPalettesVars } from './colorPalettes.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// Export to Web (CSS) -> import '--md-sys-color-*-light' from css/tokens.css

// https://m3.material.io/styles/color/roles
// https://m3.material.io/styles/color/static/baseline

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-sys-color.scss

const primary: IColorRolesPrimary = {
  primary: colorPalettesVars.primary40,
  onPrimary: colorPalettesVars.primary100,
  primaryContainer: colorPalettesVars.primary90,
  onPrimaryContainer: colorPalettesVars.primary10,
};

const secondary: IColorRolesSecondary = {
  secondary: colorPalettesVars.secondary40,
  onSecondary: colorPalettesVars.secondary100,
  secondaryContainer: colorPalettesVars.secondary90,
  onSecondaryContainer: colorPalettesVars.secondary10,
};

const tertiary: IColorRolesTertiary = {
  tertiary: colorPalettesVars.tertiary40,
  onTertiary: colorPalettesVars.tertiary100,
  tertiaryContainer: colorPalettesVars.tertiary90,
  onTertiaryContainer: colorPalettesVars.tertiary10,
};

const error: IColorRolesError = {
  error: colorPalettesVars.error40,
  onError: colorPalettesVars.error100,
  errorContainer: colorPalettesVars.error90,
  onErrorContainer: colorPalettesVars.error10,
};

const surfaceInverse: IColorRolesSurfaceInverse = {
  inverseSurface: colorPalettesVars.neutral20,
  inverseOnSurface: colorPalettesVars.neutral95,
  inversePrimary: colorPalettesVars.primary80,
};

const surface: IColorRolesSurface = {
  surface: colorPalettesVars.neutral98,
  onSurface: colorPalettesVars.neutral10,
  onSurfaceVariant: colorPalettesVars.neutralVariant30,
  surfaceContainerLowest: colorPalettesVars.neutral100,
  surfaceContainerLow: colorPalettesVars.neutral96,
  surfaceContainer: colorPalettesVars.neutral94,
  surfaceContainerHigh: colorPalettesVars.neutral92,
  surfaceContainerHighest: colorPalettesVars.neutral90,
  ...surfaceInverse,
};

const outline: IColorRolesOutline = {
  outline: colorPalettesVars.neutralVariant50,
  outlineVariant: colorPalettesVars.neutralVariant80,
};

const addOnsFixed: IColorRolesAddOnsFixed = {
  primaryFixed: colorPalettesVars.primary90,
  secondaryFixed: colorPalettesVars.secondary90,
  tertiaryFixed: colorPalettesVars.tertiary90,
};

const addOnsDim: IColorRolesAddOnsDim = {
  primaryFixedDim: colorPalettesVars.primary80,
  secondaryFixedDim: colorPalettesVars.secondary80,
  tertiaryFixedDim: colorPalettesVars.tertiary80,
};

const addOnsOnFixed: IColorRolesAddOnsOnFixed = {
  onPrimaryFixed: colorPalettesVars.primary10,
  onSecondaryFixed: colorPalettesVars.secondary10,
  onTertiaryFixed: colorPalettesVars.tertiary10,
};

const addOnsOnFixedVariant: IColorRolesAddOnsOnFixedVariant = {
  onPrimaryFixedVariant: colorPalettesVars.primary30,
  onSecondaryFixedVariant: colorPalettesVars.secondary30,
  onTertiaryFixedVariant: colorPalettesVars.tertiary30,
};

const addOns: IColorRolesAddOns = {
  ...addOnsFixed,
  ...addOnsDim,
  ...addOnsOnFixed,
  ...addOnsOnFixedVariant,
  surfaceDim: colorPalettesVars.neutral87,
  surfaceBright: colorPalettesVars.neutral98,
};

const colorRoles: IColorRoles = {
  ...primary,
  ...secondary,
  ...tertiary,
  ...error,
  ...surface,
  ...outline,
  ...addOns,
  shadow: colorPalettesVars.neutral0,
  scrim: colorPalettesVars.neutral0,
  surfaceSelection: colorPalettesVars.neutralVariant70,
};

// This is a workaround to allow reaplying vars at the component level so that it can uses themed
// vars. See https://github.com/facebook/stylex/issues/162#issuecomment-1853775396
export const colorRolesVars = stylex.defineVars(colorRoles);
export const colorRolesTheme = stylex.createTheme(colorRolesVars, colorRoles);
