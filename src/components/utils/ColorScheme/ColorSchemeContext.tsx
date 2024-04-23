import { createContext } from 'react';

export type IColorScheme = 'light' | 'dark';

export type IColorSchemeContext = {
  scheme?: IColorScheme;
  root?: React.MutableRefObject<HTMLElement | null>;
};

export const colorSchemeInitialContext: IColorSchemeContext = {
  scheme: 'light',
};

export const ColorSchemeContext = createContext<IColorSchemeContext>(
  colorSchemeInitialContext,
);
