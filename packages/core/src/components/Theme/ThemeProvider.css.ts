import {
  createGlobalThemeContract,
  globalLayer,
  style,
} from '@vanilla-extract/css';

import type {
  IRuntimeThemeTokens,
  ITheme,
  IThemeColorSchemeVariant,
} from './theme.types';
import { getCssVarName } from '~/utils/css/getCssVarName';
import { getDefaultTheme } from './utils/getDefaultTheme';

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

export const classNames = {
  root: style({
    display: 'contents',
  }),
};

export const defaultTheme = getDefaultTheme(themeTokens);
