import type { IThemeElevationLevelValues } from '~/components/ThemeProvider';
import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'level' | 'disabled';

const getBoxShadow = (level: IThemeElevationLevelValues): string =>
  [
    [
      px(level.primary.offsetX),
      px(level.primary.offsetY),
      px(level.primary.blurRadius),
      px(level.primary.spreadRadius),
      `color-mix(${[
        'in srgb',
        `${themeTokens.colorScheme.shadow} ${level.primary.colorOpacityPercentage}`,
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
        `${themeTokens.colorScheme.shadow} ${level.secondary.colorOpacityPercentage}`,
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

const [tokensClassName, tokens] = createTheme({
  transitionDuration: themeTokens.motion.duration.short3,
  transitionTimingFunction: themeTokens.motion.easing.standard.normal,
  level: elevationLevelPreset[0],
});

const classNames = createStyles({
  root: {
    display: 'flex',
    pointerEvents: 'none',
    transitionProperty: 'box-shadow',
    boxShadow: tokens.level,
    transitionDuration: tokens.transitionDuration,
    transitionTimingFunction: tokens.transitionTimingFunction,
    borderRadius: 'inherit',
    inset: 0,
    position: 'absolute',

    selectors: {
      [getModifierSelector<IModifier>({ level: 1 })]: {
        boxShadow: getBoxShadow(themeTokens.elevation.level[1]),
      },
      [getModifierSelector({ level: 2 })]: {
        boxShadow: getBoxShadow(themeTokens.elevation.level[2]),
      },
      [getModifierSelector({ level: 3 })]: {
        boxShadow: getBoxShadow(themeTokens.elevation.level[3]),
      },
      [getModifierSelector({ level: 4 })]: {
        boxShadow: getBoxShadow(themeTokens.elevation.level[4]),
      },
      [getModifierSelector({ level: 5 })]: {
        boxShadow: getBoxShadow(themeTokens.elevation.level[5]),
      },
      [getModifierSelector('disabled')]: {
        transition: 'none',
      },
    },
  },
});

export type IElevationThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const elevationTheme = componentThemeFactory<IElevationThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
