import { useContext } from 'react';

import {
  ColorSchemeContext,
  type IColorSchemeContextValue,
} from './ColorScheme.context';

export const useColorScheme = (): IColorSchemeContextValue => {
  const context = useContext(ColorSchemeContext);

  return context;
};
