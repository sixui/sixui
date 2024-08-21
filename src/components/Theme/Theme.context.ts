import { createContext } from 'react';

import type { ITheme } from '~/themes/base';
import type { StyleXStyles } from '@stylexjs/stylex/lib/StyleXTypes';

export type IThemeSettings = {
  linkAs: React.ElementType;
};

export type IThemeComponentStyles = Record<string, StyleXStyles>;

export type IThemeContextValue = {
  theme: ITheme;
  settings?: IThemeSettings;
  componentsStyles?: IThemeComponentStyles;
};

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);
