import { createContext } from 'react';

export type IColorSchemeVariant = 'light' | 'dark';

export type IColorSchemeContextValue = {
  variant: IColorSchemeVariant;
  root?: React.MutableRefObject<HTMLElement | null>;
};

export const colorSchemeInitialContextValue: IColorSchemeContextValue = {
  variant: 'light',
};

export const ColorSchemeContext = createContext<IColorSchemeContextValue>(
  colorSchemeInitialContextValue,
);
