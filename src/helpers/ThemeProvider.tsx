import React from 'react';

import { type IThemeContext, ThemeContext } from './ThemeContext';

export const ThemeProvider: React.Provider<IThemeContext> =
  ThemeContext.Provider;
