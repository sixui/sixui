import { useContext } from 'react';

import {
  ColorSchemeContext,
  type IColorSchemeContextValue,
} from './ColorSchemeContext';

export const useColorScheme = (): IColorSchemeContextValue => {
  const context = useContext(ColorSchemeContext);

  return context;
};
