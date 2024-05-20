import { useContext } from 'react';

import { ThemeContext, type IThemeContext } from './ThemeContext';

export const useThemeContext = (): IThemeContext => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeProvider not set.');
  }

  return themeContext;
};
