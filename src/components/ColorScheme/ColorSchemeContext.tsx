import { createContext } from 'react';

export type IColorSchemeVariant = 'light' | 'dark';

export type IColorSchemeContextValue = {
  scheme?: IColorSchemeVariant;
  root?: React.MutableRefObject<HTMLElement | null>;
};

export const colorSchemeInitialContextValue: IColorSchemeContextValue = {
  scheme: 'light',
};

export const ColorSchemeContext = createContext<IColorSchemeContextValue>(
  colorSchemeInitialContextValue,
);
