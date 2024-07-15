import { createContext } from 'react';

export type IColorScheme = 'light' | 'dark';

export type IColorSchemeContextValue = {
  scheme?: IColorScheme;
  root?: React.MutableRefObject<HTMLElement | null>;
};

export const colorSchemeInitialContextValue: IColorSchemeContextValue = {
  scheme: 'light',
};

export const ColorSchemeContext = createContext<IColorSchemeContextValue>(
  colorSchemeInitialContextValue,
);
