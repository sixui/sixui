import { useContext } from 'react';

import { type IColorScheme, ColorSchemeContext } from './ColorSchemeContext';

export const useColorScheme = (): IColorScheme => {
  const colorScheme = useContext(ColorSchemeContext)?.colorScheme;
  if (!colorScheme) {
    throw new Error('ColorSchemeProvider not set.');
  }

  return colorScheme;
};
