import * as React from 'react';

import { type ITheme, ThemeContext } from '@/helpers/ThemeContext';

export const useTheme = (): ITheme => {
  const theme = React.useContext(ThemeContext)?.theme;
  if (!theme) {
    throw new Error('ThemeProvider not set.');
  }

  return theme;
};
