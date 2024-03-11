import { createContext } from 'react';

export type IColorScheme = 'light' | 'dark';

export type IColorSchemeContext = {
  colorScheme: IColorScheme;
};

export const initialContext: IColorSchemeContext = {
  colorScheme: 'light',
};

export const ColorSchemeContext =
  createContext<IColorSchemeContext>(initialContext);
