import { createContext, useContext } from 'react';

import type { ITheme2 } from './theme.types';

export type IThemeContextValue = {
  root: React.RefObject<HTMLDivElement>;
  theme: ITheme2;
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
