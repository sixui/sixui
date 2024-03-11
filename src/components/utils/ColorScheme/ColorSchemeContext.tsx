import { createContext } from 'react';

export type IColorScheme = 'light' | 'dark';

export type IColorSchemeContext = IColorScheme;

export const initialContext: IColorSchemeContext = 'light';

export const ColorSchemeContext =
  createContext<IColorSchemeContext>(initialContext);
