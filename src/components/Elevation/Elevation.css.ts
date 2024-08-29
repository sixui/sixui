import { createTheme, style } from '@vanilla-extract/css';

import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { themeTokens, type IThemeElevationLevelValues } from '../ThemeProvider';
import { colorSchemeTokens } from '../ColorScheme';

export type IElevationStyleName = keyof typeof elevationStyles;

const getBoxShadow = (level: IThemeElevationLevelValues): string =>
  [
    [
      px(level.primary.offsetX),
      px(level.primary.offsetY),
      px(level.primary.blurRadius),
      px(level.primary.spreadRadius),
      `color-mix(${[
        'in srgb',
        `${colorSchemeTokens.shadow} ${level.primary.colorOpacityPercentage}`,
        'transparent',
      ].join(', ')})`,
    ].join(' '),
    [
      px(level.secondary.offsetX),
      px(level.secondary.offsetY),
      px(level.secondary.blurRadius),
      px(level.secondary.spreadRadius),
      `color-mix(${[
        'in srgb',
        `${colorSchemeTokens.shadow} ${level.secondary.colorOpacityPercentage}`,
        'transparent',
      ].join(', ')})`,
    ].join(' '),
  ].join(', ');

export const elevationLevelPreset = {
  0: 'none',
  1: getBoxShadow(themeTokens.elevation.level[1]),
  2: getBoxShadow(themeTokens.elevation.level[2]),
  3: getBoxShadow(themeTokens.elevation.level[3]),
  4: getBoxShadow(themeTokens.elevation.level[4]),
  5: getBoxShadow(themeTokens.elevation.level[5]),
};

export const [elevationTheme, elevationTokens] = createTheme({
  transitionDuration: themeTokens.motion.duration.medium.$2,
  transitionTimingFunction: themeTokens.motion.easing.standard.normal,
  level: elevationLevelPreset[0],
});

const root = style({
  display: 'flex',
  pointerEvents: 'none',
  transitionProperty: 'box-shadow',
  boxShadow: elevationTokens.level,
  transitionDuration: elevationTokens.transitionDuration,
  transitionTimingFunction: elevationTokens.transitionTimingFunction,
  borderRadius: 'inherit',
  inset: 0,
  position: 'absolute',

  selectors: {
    [`${getModifierSelector('level="1"')}`]: {
      boxShadow: getBoxShadow(themeTokens.elevation.level[1]),
    },
    [`${getModifierSelector('level="2"')}`]: {
      boxShadow: getBoxShadow(themeTokens.elevation.level[2]),
    },
    [`${getModifierSelector('level="3"')}`]: {
      boxShadow: getBoxShadow(themeTokens.elevation.level[3]),
    },
    [`${getModifierSelector('level="4"')}`]: {
      boxShadow: getBoxShadow(themeTokens.elevation.level[4]),
    },
    [`${getModifierSelector('level="5"')}`]: {
      boxShadow: getBoxShadow(themeTokens.elevation.level[5]),
    },
    [`${getModifierSelector('disabled')}`]: {
      transition: 'none',
    },
  },
});

export const elevationStyles = {
  root,
};
