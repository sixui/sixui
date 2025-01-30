import { createTheme as veCreateTheme } from '@vanilla-extract/css';

import type { IVeTokens, IVeWithOptionalLayer } from '../vanillaExtract.types';
import { cssLayers } from '~/components/ThemeProvider';

/** @deprecated - use createComponentTheme() **/
export const createTheme = <TThemeTokens extends IVeTokens>(
  theme?: TThemeTokens,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
  veCreateTheme({
    '@layer': cssLayers.theme,
    ...theme,
  } as IVeWithOptionalLayer<TThemeTokens>);
