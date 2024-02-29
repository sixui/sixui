import { useContext } from 'react';

import { type ITheme, ThemeContext } from '@/helpers/ThemeContext';

export const useTheme = (): ITheme => {
  const theme = useContext(ThemeContext)?.theme;
  if (!theme) {
    throw new Error('ThemeProvider not set.');
  }

  return theme;
};
