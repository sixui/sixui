import { useContext } from 'react';

import { ThemeContext, type IThemeContextValue } from './ThemeContext';

export const useThemeContext = (): IThemeContextValue => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeProvider not set.');
  }

  return themeContext;
};
