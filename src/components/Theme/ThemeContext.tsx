import type { StyleXStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { createContext } from 'react';

export type IThemeSettings = {
  linkAs: React.ElementType;
};

export type IThemeContextValue = {
  settings: IThemeSettings;
  componentsStyles?: Record<string, StyleXStyles>;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);
