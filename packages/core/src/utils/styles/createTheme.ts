import { createTheme as veCreateTheme } from '@vanilla-extract/css';

import { cssLayers } from '~/components/ThemeProvider';

type ITokens = {
  [key: string]: string | ITokens;
};

type IWithOptionalLayer<T extends ITokens> = T & {
  '@layer'?: string;
};

export const createTheme = <TThemeTokens extends ITokens>(
  theme?: TThemeTokens,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
  veCreateTheme({
    '@layer': cssLayers.theme,
    ...theme,
  } as IWithOptionalLayer<TThemeTokens>);
