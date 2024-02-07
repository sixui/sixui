import stylex from '@stylexjs/stylex';

import type { IColorPalettes } from '../../colorPalettes.types';

// Generate a new color palette with Material Theme Builder:
// https://m3.material.io/theme-builder#/custom
// - Primary: #6750a4
// - Secondary: #958da4
// - Tertiary: #b58392
// - Neutral: #938f94
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

// https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md#color-theming
// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L68
const primaryPalette = {
  primary0: '#000',
  primary10: '#22005d',
  primary20: '#381e72',
  primary25: '#432b7e',
  primary30: '#4f378a',
  primary35: '#5b4397',
  primary40: '#6750a4',
  primary50: '#8069bf',
  primary60: '#9a83db',
  primary70: '#b69df8',
  primary80: '#cfbcff',
  primary90: '#e9ddff',
  primary95: '#f6eeff',
  primary98: '#fdf7ff',
  primary99: '#fffbff',
  primary100: '#fff',
};

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L81
const secondaryPalette = {
  secondary0: '#000',
  secondary10: '#1e192b',
  secondary20: '#332d41',
  secondary25: '#3e384c',
  secondary30: '#4a4458',
  secondary35: '#564f64',
  secondary40: '#625b71',
  secondary50: '#7b748a',
  secondary60: '#958da4',
  secondary70: '#b0a7c0',
  secondary80: '#cbc2db',
  secondary90: '#e8def8',
  secondary95: '#f6eeff',
  secondary98: '#fdf7ff',
  secondary99: '#fffbff',
  secondary100: '#fff',
};

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L94
const tertiaryPalette = {
  tertiary0: '#000',
  tertiary10: '#31101d',
  tertiary20: '#4a2532',
  tertiary25: '#56303d',
  tertiary30: '#633b48',
  tertiary35: '#704654',
  tertiary40: '#7e5260',
  tertiary50: '#996a79',
  tertiary60: '#b58392',
  tertiary70: '#d29dad',
  tertiary80: '#efb8c8',
  tertiary90: '#ffd9e3',
  tertiary95: '#ffecf0',
  tertiary98: '#fff8f8',
  tertiary99: '#fffbff',
  tertiary100: '#fff',
};

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L44
const neutralPalette = {
  neutral0: '#000',
  neutral4: '#0f0e11',
  neutral6: '#141316',
  neutral10: '#1c1b1e',
  neutral12: '#211f23',
  neutral17: '#2b292d',
  neutral20: '#313033',
  neutral22: '#363438',
  neutral24: '#3b383d',
  neutral25: '#3d3b3e',
  neutral30: '#48464a',
  neutral35: '#545156',
  neutral40: '#605d62',
  neutral50: '#79767a',
  neutral60: '#938f94',
  neutral70: '#aeaaae',
  neutral80: '#cac5ca',
  neutral87: '#ded8de',
  neutral90: '#e6e1e6',
  neutral92: '#ece6ec',
  neutral94: '#f2ecf2',
  neutral95: '#f4eff4',
  neutral96: '#f8f2f7',
  neutral98: '#fdf8fd',
  neutral99: '#fffbff',
  neutral100: '#fff',
};

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L31
const neutralVariant = {
  neutralVariant0: '#000',
  neutralVariant10: '#1d1a22',
  neutralVariant20: '#322f38',
  neutralVariant25: '#3d3a43',
  neutralVariant30: '#49454e',
  neutralVariant35: '#54515a',
  neutralVariant40: '#615d66',
  neutralVariant50: '#7a757f',
  neutralVariant60: '#948f99',
  neutralVariant70: '#afa9b4',
  neutralVariant80: '#cac4cf',
  neutralVariant90: '#e7e0eb',
  neutralVariant95: '#f5eefa',
  neutralVariant98: '#fdf7ff',
  neutralVariant99: '#fffbff',
  neutralVariant100: '#fff',
};

// https://github.com/material-components/material-web/blob/main/tokens/v0_192/_md-ref-palette.scss#L18
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
