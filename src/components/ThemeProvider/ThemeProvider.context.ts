import { createContext, useContext } from 'react';

import type { ITheme2, IThemeColorSchemeVariant } from './theme.types';

export type IThemeContextValue = {
  getRoot: () => HTMLDivElement | null;
  theme: ITheme2;
  colorSchemeVariant: IThemeColorSchemeVariant;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);

export const useThemeContext = (): IThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      '[@sixui] You forgot to wrap your component in <ThemeProvider />.',
    );
  }

  return context;
};
