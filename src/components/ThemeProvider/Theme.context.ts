import { createContext } from 'react';

import type { ITheme2 } from './ThemeProvider.types';

export type IThemeSettings = {
  linkAs: React.ElementType;
};

export type IThemeContextValue = {
  root: React.RefObject<HTMLDivElement>;
  theme: ITheme2;
  settings?: IThemeSettings;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);
