import {
  createGlobalThemeContract,
  createTheme,
  globalLayer,
  style,
} from '@vanilla-extract/css';

import type {
  IRuntimeThemeTokens,
  ITheme,
  IThemeColorSchemeVariant,
} from './theme.types';
import { getCssVarName } from '~/utils/styles/getCssVarName';
import { getDefaultTheme } from './getDefaultTheme';

export const cssLayers = {
  reset: globalLayer('sixui-reset'),
  base: globalLayer('sixui-base'),
  theme: globalLayer('sixui-theme'),
  components: globalLayer('sixui-components'),
  sprinkles: globalLayer('sixui-sprinkles'),
};

const getRuntimeThemeTokens = (
  theme: ITheme,
  colorSchemeVariant: IThemeColorSchemeVariant = 'light',
): IRuntimeThemeTokens => {
  const { colorScheme, ...otherTokens } = theme.tokens;
  const runtimeThemeTokens = {
    ...otherTokens,
    colorScheme: colorScheme[colorSchemeVariant],
  };

  return runtimeThemeTokens;
};

export const themeTokens = createGlobalThemeContract(
  getRuntimeThemeTokens(getDefaultTheme()),
  (_value, path) => getCssVarName(path),
);

export const defaultTheme = getDefaultTheme(themeTokens);

export const themeTokensClassName = createTheme(themeTokens, {
  '@layer': cssLayers.theme,
  ...getRuntimeThemeTokens(defaultTheme),
});

export const styles = {
  root: style({
    '@layer': {
      [cssLayers.theme]: {
        color: themeTokens.colorScheme.onSurface,
        '@media': {
          '(pointer: fine)': {
            scrollbarColor: `${themeTokens.colorScheme.primary} transparent`,
          },
        },
      },
    },
  }),
};
