import stylex from '@stylexjs/stylex';

import type { ITonalPalettesThemeVars } from '@/themes/base';
import { tonalPalettesTokens } from '@/themes/base/tonalPalettes.stylex';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// - Primary: #C8206D
// Export to Material Theme (JSON) -> import '--md-ref-palette-*' from css/tokens.css

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
  primary0: '#000000',
  primary10: '#3E001D',
  primary20: '#650032',
  primary25: '#79003D',
  primary30: '#8E0049',
  primary35: '#A40055',
  primary40: '#B80B61',
  primary50: '#DA317A',
  primary60: '#FC4D94',
  primary70: '#FF84AD',
  primary80: '#FFB1C7',
  primary90: '#FFD9E2',
  primary95: '#FFECEF',
  primary98: '#FFF8F8',
  primary99: '#FFFBFF',
  primary100: '#FFFFFF',
};

const secondaryPalette = {
  secondary0: '#000000',
  secondary10: '#340E1C',
  secondary20: '#4D2331',
  secondary25: '#5A2E3C',
  secondary30: '#673947',
  secondary35: '#744453',
  secondary40: '#82505F',
  secondary50: '#9E6878',
  secondary60: '#BA8191',
  secondary70: '#D79BAC',
  secondary80: '#F5B5C7',
  secondary90: '#FFD9E2',
  secondary95: '#FFECEF',
  secondary98: '#FFF8F8',
  secondary99: '#FFFBFF',
  secondary100: '#FFFFFF',
};

const tertiaryPalette = {
  tertiary0: '#000000',
  tertiary10: '#2E1500',
  tertiary20: '#4C2700',
  tertiary25: '#5C3100',
  tertiary30: '#6C3A00',
  tertiary35: '#7D4400',
  tertiary40: '#8B500E',
  tertiary50: '#A96826',
  tertiary60: '#C7813D',
  tertiary70: '#E69B54',
  tertiary80: '#FFB778',
  tertiary90: '#FFDCC1',
  tertiary95: '#FFEEE2',
  tertiary98: '#FFF8F5',
  tertiary99: '#FFFBFF',
  tertiary100: '#FFFFFF',
};

const neutralPalette = {
  neutral0: '#000000',
  neutral4: '#120D0E',
  neutral6: '#171213',
  neutral10: '#201A1B',
  neutral12: '#241E1F',
  neutral17: '#2F2829',
  neutral20: '#352F30',
  neutral22: '#3A3334',
  neutral24: '#3E3738',
  neutral25: '#413A3B',
  neutral30: '#4C4546',
  neutral35: '#585052',
  neutral40: '#645C5E',
  neutral50: '#7E7576',
  neutral60: '#988E90',
  neutral70: '#B3A9AA',
  neutral80: '#CFC4C5',
  neutral87: '#E3D7D8',
  neutral90: '#ECE0E1',
  neutral92: '#F1E5E6',
  neutral94: '#F7EBEC',
  neutral95: '#FAEEEF',
  neutral96: '#FDF1F2',
  neutral98: '#FFF8F8',
  neutral99: '#FFFBFF',
  neutral100: '#FFFFFF',
};

const neutralVariant = {
  neutralVariant0: '#000000',
  neutralVariant10: '#24191C',
  neutralVariant20: '#3A2D30',
  neutralVariant25: '#45383B',
  neutralVariant30: '#514346',
  neutralVariant35: '#5D4F52',
  neutralVariant40: '#6A5B5E',
  neutralVariant50: '#837376',
  neutralVariant60: '#9E8C90',
  neutralVariant70: '#B9A7AA',
  neutralVariant80: '#D5C2C5',
  neutralVariant90: '#F2DDE1',
  neutralVariant95: '#FFECEF',
  neutralVariant98: '#FFF8F8',
  neutralVariant99: '#FFFBFF',
  neutralVariant100: '#FFFFFF',
};

const errorPalette = {
  error0: '#000000',
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

export const tonalPalettesVars = stylex.defineVars<ITonalPalettesThemeVars>({
  white: '#fff',
  black: '#000',

  ...primaryPalette,
  ...secondaryPalette,
  ...tertiaryPalette,
  ...neutralPalette,
  ...neutralVariant,
  ...errorPalette,
});

export const tonalPalettesTheme = stylex.createTheme(
  tonalPalettesTokens,
  tonalPalettesVars,
);
