import { useContext } from 'react';

import {
  type IColorSchemeContext,
  ColorSchemeContext,
} from './ColorSchemeContext';

export const useColorScheme = (): IColorSchemeContext => {
  const context = useContext(ColorSchemeContext);
  if (!context.scheme) {
    throw new Error('ColorSchemeProvider not set.');
  }

  return context;
};
