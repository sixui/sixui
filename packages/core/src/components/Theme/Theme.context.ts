import { createContext, useContext } from 'react';

import type { ITheme, IThemeColorSchemeVariant } from './theme.types';

export type IThemeContextValue = {
  getRoot: () => HTMLDivElement | null;
  theme: ITheme;
  colorSchemeVariant: IThemeColorSchemeVariant;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);

export const useThemeContext = (): IThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      '[@sixui/core] You forgot to wrap your component in <ThemeProvider />.',
    );
  }

  return context;
};
