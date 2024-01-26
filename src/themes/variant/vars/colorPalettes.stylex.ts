import * as stylex from '@stylexjs/stylex';

import { colorPalettesVars as baseColorPalettesVars } from '@/themes/base/vars/colorPalettes.stylex';
import type { IColorPalettes } from '../../colorPalettes.types';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// - Primary: #31C48D
// - Secondary: #7f9688
// - Tertiary: #7096a7
// - Neutral: #8f918e
// Export to Web (CSS) -> import '--md-ref-palette-*' from css/tokens.css

// Missing colors:
// - neutral4 (dark.surfaceContainerLowest)
// - neutral6 (dark.surface, dark.surfaceDim)
// - neutral12 (dark.surfaceContainer)
// - neutral17 (dark.surfaceContainerHigh)
// - neutral22 (dark.surfaceContainerHighest)
// - neutral87 (light.surfaceDim)
// - neutral92 (light.surfaceContainerHigh)
// - neutral94 (light.surfaceContainer)
// - neutral96 (light.surfaceContainerLow)

// Find missing colors using HCT Color Picker from Material Theme Builder:
// 1. Create an extended color from an existing color (ie. the neutral color from the core colors)
// 2. Change the Tone to match the required tone

const primaryPalette = {
  primary0: '#000',
  primary10: '#002114',
  primary20: '#003825',
  primary25: '#00452e',
  primary30: '#005237',
  primary35: '#005f40',
  primary40: '#006c4a',
  primary50: '#00885e',
  primary60: '#00a573',
  primary70: '#2dc18b',
  primary80: '#53dea5',
  primary90: '#73fbbf',
  primary95: '#73fbbf',
  primary98: '#73fbbf',
  primary99: '#f4fff6',
  primary100: '#fff',
};

const secondaryPalette = {
  secondary0: '#000',
  secondary10: '#0a1f16',
  secondary20: '#1f352a',
  secondary25: '#2a4035',
  secondary30: '#364b40',
  secondary35: '#41574b',
  secondary40: '#4d6357',
  secondary50: '#657c6f',
  secondary60: '#7f9688',
  secondary70: '#99b1a2',
  secondary80: '#b4ccbd',
  secondary90: '#cfe9d8',
  secondary95: '#def7e6',
  secondary98: '#e8fff0',
  secondary99: '#f4fff6',
  secondary100: '#fff',
};

const tertiaryPalette = {
  tertiary0: '#000',
  tertiary10: '#001f29',
  tertiary20: '#063543',
  tertiary25: '#16404e',
  tertiary30: '#244c5a',
  tertiary35: '#305766',
  tertiary40: '#3d6473',
  tertiary50: '#567c8c',
  tertiary60: '#7096a7',
  tertiary70: '#8ab1c2',
  tertiary80: '#a5cdde',
  tertiary90: '#c0e9fb',
  tertiary95: '#def4ff',
  tertiary98: '#f3faff',
  tertiary99: '#fafdff',
  tertiary100: '#fff',
};

const neutralPalette = {
  neutral0: '#000',
  neutral4: '#0c0f0d',
  neutral6: '#111412',
  neutral10: '#191c1a',
  neutral12: '#1e201e',
  neutral17: '#282b28',
  neutral20: '#2e312f',
  neutral22: '#333533',
  neutral24: '#373a38',
  neutral25: '#393c3a',
  neutral30: '#444845',
  neutral35: '#505350',
  neutral40: '#5c5f5c',
  neutral50: '#757875',
  neutral60: '#8f918e',
  neutral70: '#a9aca8',
  neutral80: '#c5c7c3',
  neutral87: '#d9dad7',
  neutral90: '#e1e3df',
  neutral92: '#e7e9e5',
  neutral94: '#edeeeb',
  neutral95: '#eff1ed',
  neutral96: '#f3f4f0',
  neutral98: '#f8faf6',
  neutral99: '#fbfdf9',
  neutral100: '#fff',
};

const neutralVariant = {
  neutralVariant0: '#000',
  neutralVariant10: '#151d19',
  neutralVariant20: '#2a322d',
  neutralVariant25: '#353d38',
  neutralVariant30: '#404943',
  neutralVariant35: '#4c554f',
  neutralVariant40: '#58605a',
  neutralVariant50: '#707973',
  neutralVariant60: '#8a938c',
  neutralVariant70: '#a4ada6',
  neutralVariant80: '#c0c9c1',
  neutralVariant90: '#dce5dd',
  neutralVariant95: '#eaf3eb',
  neutralVariant98: '#f2fcf4',
  neutralVariant99: '#f5fff6',
  neutralVariant100: '#fff',
};

const errorPalette = {
  error0: '#000',
  error10: '#410002',
  error20: '#690005',
  error25: '#7e0007',
  error30: '#93000a',
  error35: '#a80710',
  error40: '#ba1a1a',
  error50: '#de3730',
  error60: '#ff5449',
  error70: '#ff897d',
  error80: '#ffb4ab',
  error90: '#ffdad6',
  error95: '#ffedea',
  error98: '#fff8f7',
  error99: '#fffbff',
  error100: '#fff',
};

export const colorPalettesVars = stylex.defineVars<IColorPalettes>({
  white: '#fff',
  black: '#000',

  ...primaryPalette,
  ...secondaryPalette,
  ...tertiaryPalette,
  ...neutralPalette,
  ...neutralVariant,
  ...errorPalette,
});

export const colorPaletteTheme = stylex.createTheme(
  baseColorPalettesVars,
  colorPalettesVars,
);
