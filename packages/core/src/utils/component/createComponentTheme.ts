import { createGlobalThemeContract, createTheme } from '@vanilla-extract/css';

import type {
  IVeContractTokens,
  IVeCSSVarFunction,
  IVeMapLeafNodes,
  IVeTokens,
} from '../css/vanillaExtract.types';
import { cssLayers } from '~/components/Theme/cssLayers.css';
import { getCssVarName } from '../css/getCssVarName';

const lowercaseFirstLetter = (value: string): string => {
  if (!value) {
    return value;
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
};

export const createComponentTheme = <TThemeTokens extends IVeTokens>(
  componentName: string,
  theme: TThemeTokens = {} as TThemeTokens,
): [string, IVeMapLeafNodes<TThemeTokens, IVeCSSVarFunction>] => {
  const globalThemeContract = createGlobalThemeContract(theme, (_value, path) =>
    getCssVarName(path, lowercaseFirstLetter(componentName)),
  );

  const className = createTheme(globalThemeContract, {
    '@layer': cssLayers.theme,
    ...theme,
  } as IVeContractTokens<typeof globalThemeContract>);

  return [className, globalThemeContract];
};
