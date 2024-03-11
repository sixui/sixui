import { useContext } from 'react';

import { type IColorScheme, ColorSchemeContext } from './ColorSchemeContext';

export const useColorScheme = (): IColorScheme => {
  const colorScheme = useContext(ColorSchemeContext);
  if (!colorScheme) {
    throw new Error('ColorSchemeProvider not set.');
  }

  return colorScheme;
};
